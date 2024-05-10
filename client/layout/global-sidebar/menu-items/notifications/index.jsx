import { englishLocales } from '@automattic/i18n-utils';
import { hasTranslation } from '@wordpress/i18n';
import classNames from 'classnames';
import { throttle } from 'lodash';
import PropTypes from 'prop-types';
import { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import store from 'store';
import DismissibleCard from 'calypso/blocks/dismissible-card';
import AsyncLoad from 'calypso/components/async-load';
import TranslatableString from 'calypso/components/translatable/proptype';
import SidebarMenuItem from 'calypso/layout/global-sidebar/menu-items/menu-item';
import { isE2ETest } from 'calypso/lib/e2e';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { getCurrentUserId } from 'calypso/state/current-user/selectors';
import getCurrentLocaleSlug from 'calypso/state/selectors/get-current-locale-slug';
import hasUnseenNotifications from 'calypso/state/selectors/has-unseen-notifications';
import isNotificationsOpen from 'calypso/state/selectors/is-notifications-open';
import { toggleNotificationsPanel } from 'calypso/state/ui/actions';
import { BellIcon } from './icon';

import './style.scss';

class SidebarNotifications extends Component {
	static propTypes = {
		className: PropTypes.string,
		title: TranslatableString,
		onClick: PropTypes.func,
		//connected
		isNotificationsOpen: PropTypes.bool,
		hasUnseenNotifications: PropTypes.bool,
		tooltip: TranslatableString,
		translate: PropTypes.func,
		currentUserId: PropTypes.number,
		locale: PropTypes.string,
	};

	notificationLink = createRef();
	notificationPanel = createRef();

	state = {
		animationState: 0,
		newNote: this.props.hasUnseenNotifications,
	};

	componentDidUpdate( prevProps ) {
		if ( ! prevProps.isNotificationsOpen && this.props.isNotificationsOpen ) {
			this.props.recordTracksEvent( 'calypso_notification_open', {
				unread_notifications: store.get( 'wpnotes_unseen_count' ),
			} );
			this.setNotesIndicator( 0 );
		}

		// focus on main window if we just closed the notes panel
		if ( prevProps.isNotificationsOpen && ! this.props.isNotificationsOpen ) {
			this.notificationLink.current.blur();
			this.notificationPanel.current.blur();
			window.focus();
		}
	}

	// This toggle gets called both on the calypso and panel sides. Throttle it to prevent calls on
	// both sides from conflicting and cancelling each other out.
	checkToggleNotes = throttle(
		( event, forceToggle, forceOpen = false ) => {
			const target = event ? event.target : false;

			// Ignore clicks or other events which occur inside of the notification panel.
			if (
				target &&
				( this.notificationLink.current.contains( target ) ||
					this.notificationPanel.current.contains( target ) )
			) {
				return;
			}

			// Prevent toggling closed if we are opting to open.
			if ( forceOpen && this.props.isNotificationsOpen ) {
				return;
			}

			if ( this.props.isNotificationsOpen || forceToggle === true || forceOpen === true ) {
				this.toggleNotesFrame( event );
			}
		},
		100,
		{ leading: true, trailing: false }
	);

	toggleNotesFrame = ( event ) => {
		if ( event ) {
			event.preventDefault && event.preventDefault();
			event.stopPropagation && event.stopPropagation();
		}
		// Get URL and if it matches "/read/notifications", don't open the panel
		// As it will cause duplicate notification panels to show
		if ( window.location.pathname === '/read/notifications' ) {
			return;
		}

		this.props.toggleNotificationsPanel();
	};

	/**
	 * Uses the passed number of unseen notifications
	 * and the locally-stored cache of that value to
	 * determine what state the notifications indicator
	 * should be in: on, off, or animate-to-on
	 * @param {number} currentUnseenCount Number of reported unseen notifications
	 */
	setNotesIndicator = ( currentUnseenCount ) => {
		const existingUnseenCount = store.get( 'wpnotes_unseen_count' );
		let newAnimationState = this.state.animationState;

		if ( 0 === currentUnseenCount ) {
			// If we don't have new notes at load-time, remove the `-1` "init" status
			newAnimationState = 0;
		} else if ( currentUnseenCount > existingUnseenCount ) {
			// Animate the indicator bubble by swapping CSS classes through the animation state
			// Note that we could have an animation state of `-1` indicating the initial load
			newAnimationState = 1 - Math.abs( this.state.animationState );
		}

		store.set( 'wpnotes_unseen_count', currentUnseenCount );

		this.setState( {
			newNote: currentUnseenCount > 0,
			animationState: newAnimationState,
		} );
	};

	handleClick = ( event ) => {
		this.toggleNotesFrame( event );
		this.props.onClick();
	};

	render() {
		const classes = classNames( this.props.className, 'sidebar-notifications', {
			'is-active': this.props.isActive,
			'has-unread': this.state.newNote,
			'is-initial-load': this.state.animationState === -1,
		} );

		const shouldShowNotificationsPointer =
			// Show pointer for 2 weeks.
			Date.now() < Date.parse( '23 May 2024' ) &&
			// Show pointer to users registered before 08-May-2024 (when we moved the notifications to the footer).
			this.props.currentUserId < 250450000 &&
			// Show pointer only if translated.
			( englishLocales.includes( this.props.locale ) ||
				hasTranslation( 'Looking for your notifications? They have been moved here.' ) ) &&
			// Hide pointer on E2E tests so it doesn't hide menu items that are expected to be visible.
			! isE2ETest();

		return (
			<>
				{ shouldShowNotificationsPointer &&
					createPortal(
						<DismissibleCard
							className="sidebar-notifications-pointer"
							preferenceName="nav-redesign-notifications-footer-pointer"
						>
							<span>
								{ this.props.translate(
									'Looking for your notifications? They have been moved here.'
								) }
							</span>
						</DismissibleCard>,
						document.querySelector( '.layout' )
					) }
				<SidebarMenuItem
					url="/notifications"
					icon={ <BellIcon newItems={ this.state.newNote } active={ this.props.isActive } /> }
					onClick={ this.handleClick }
					isActive={ this.props.isActive }
					tooltip={ this.props.tooltip }
					tooltipPlacement="top"
					className={ classes }
					ref={ this.notificationLink }
					key={ this.state.animationState }
				/>
				<div className="sidebar-notifications__panel" ref={ this.notificationPanel }>
					<AsyncLoad
						require="calypso/notifications"
						isShowing={ this.props.isNotificationsOpen }
						checkToggle={ this.checkToggleNotes }
						setIndicator={ this.setNotesIndicator }
						isGlobalSidebarVisible={ true }
						placeholder={ null }
					/>
				</div>
			</>
		);
	}
}

const mapStateToProps = ( state ) => {
	const isPanelOpen = isNotificationsOpen( state );
	return {
		isActive: isPanelOpen || window.location.pathname === '/read/notifications',
		isNotificationsOpen: isPanelOpen,
		hasUnseenNotifications: hasUnseenNotifications( state ),
		currentUserId: getCurrentUserId( state ),
		locale: getCurrentLocaleSlug( state ),
	};
};
const mapDispatchToProps = {
	toggleNotificationsPanel,
	recordTracksEvent,
};

export default connect( mapStateToProps, mapDispatchToProps )( SidebarNotifications );
