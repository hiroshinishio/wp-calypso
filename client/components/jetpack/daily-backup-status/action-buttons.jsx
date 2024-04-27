import { useTranslate } from 'i18n-calypso';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'calypso/components/forms/form-button';
import { backupDownloadPath, backupRestorePath } from 'calypso/my-sites/backup/paths';
import { rewindRequestBackup } from 'calypso/state/activity-log/actions';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import canRestoreSite from 'calypso/state/rewind/selectors/can-restore-site';
import getIsRestoreInProgress from 'calypso/state/selectors/get-is-restore-in-progress';
import { getSelectedSiteId, getSelectedSiteSlug } from 'calypso/state/ui/selectors';

import './style.scss';

const DownloadButton = ( { disabled, rewindId, primary } ) => {
	const translate = useTranslate();
	const dispatch = useDispatch();
	const siteSlug = useSelector( getSelectedSiteSlug );
	const siteId = useSelector( getSelectedSiteId );

	const href = disabled ? undefined : backupDownloadPath( siteSlug, rewindId );
	const onDownload = () => {
		dispatch( rewindRequestBackup( siteId, rewindId ) );
		dispatch( recordTracksEvent( 'calypso_jetpack_backup_download', { rewind_id: rewindId } ) );
	};

	return (
		<Button
			isPrimary={ primary }
			className="daily-backup-status__download-button"
			href={ href }
			disabled={ disabled }
			onClick={ onDownload }
		>
			{ translate( 'Download backup' ) }
		</Button>
	);
};

const RestoreButton = ( { disabled, rewindId, primary } ) => {
	const translate = useTranslate();
	const dispatch = useDispatch();

	const siteId = useSelector( getSelectedSiteId );
	const siteSlug = useSelector( getSelectedSiteSlug );

	const isRestoreDisabled = useSelector(
		( state ) => disabled || ! canRestoreSite( state, siteId )
	);

	const href = ! isRestoreDisabled ? backupRestorePath( siteSlug, rewindId ) : undefined;
	const onRestore = () =>
		dispatch( recordTracksEvent( 'calypso_jetpack_backup_restore', { rewind_id: rewindId } ) );

	return (
		<Button
			isPrimary={ primary }
			className="daily-backup-status__restore-button"
			href={ href }
			disabled={ isRestoreDisabled }
			onClick={ onRestore }
		>
			{ translate( 'Restore to this point' ) }
		</Button>
	);
};

const CloneButton = ( { disabled, rewindId, primary, onClickClone } ) => {
	const translate = useTranslate();

	const siteId = useSelector( getSelectedSiteId );
	const isRestoreInProgress = useSelector( ( state ) => getIsRestoreInProgress( state, siteId ) );
	const isCloneDisabled = disabled || isRestoreInProgress; // TODO check if there is valid alternate credentials?

	return (
		<Button
			isPrimary={ primary }
			className="daily-backup-status__clone-button"
			disabled={ isCloneDisabled }
			onClick={ () => onClickClone( rewindId ) }
		>
			{ translate( 'Clone from latest point' ) }
		</Button>
	);
};

const ActionButtons = ( {
	rewindId,
	disabled,
	isMultiSite,
	hasWarnings,
	availableActions,
	onClickClone,
} ) => (
	<>
		{ availableActions && availableActions.includes( 'download' ) && (
			<DownloadButton
				disabled={ disabled || ! rewindId }
				rewindId={ rewindId }
				primary={ isMultiSite }
			/>
		) }
		{ ! isMultiSite && availableActions && availableActions.includes( 'rewind' ) && (
			<RestoreButton
				disabled={ disabled || ! rewindId }
				rewindId={ rewindId }
				primary={ ! hasWarnings }
			/>
		) }
		{ availableActions && availableActions.includes( 'clone' ) && (
			<CloneButton
				disabled={ disabled }
				rewindId={ rewindId }
				primary={ true }
				onClickClone={ onClickClone }
			/>
		) }
	</>
);

ActionButtons.propTypes = {
	rewindId: PropTypes.string,
	disabled: PropTypes.bool,
	isMultiSite: PropTypes.bool,
	hasWarnings: PropTypes.bool,
	availableActions: PropTypes.arrayOf( PropTypes.string ),
	onClickClone: PropTypes.func,
};

ActionButtons.defaultProps = {
	rewindId: null,
	disabled: false,
	isMultiSite: false,
	hasWarnings: false,
	availableActions: [ 'rewind', 'download' ],
	onClickClone: () => {},
};

export default ActionButtons;
