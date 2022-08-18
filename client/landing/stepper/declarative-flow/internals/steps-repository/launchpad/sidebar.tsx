import { useSite } from 'calypso/landing/stepper/hooks/use-site';
import Checklist from './checklist';

const Sidebar = () => {
	const siteId = useSite()?.ID;

	return (
		<div className="launchpad__sidebar">
			<h5 className="launchpad__sidebar-h5">Newsletter</h5>
			<div className="launchpad__progress-bar-container">
				<span className="launchpad__progress-value">33%</span>
				<div className="launchpad__progress-bar">
					<div className="launchpad__progress-bar-completed" />
				</div>
			</div>
			{ /* eslint-disable-next-line wpcalypso/jsx-classname-namespace*/ }
			<h1 className="launchpad__sidebar-h1">Voilà! Your Newsletter is up and running!</h1>
			<p className="launchpad__sidebar-description">Keep up the momentum with these next steps.</p>
			<div className="launchpad__url-box">lorcaletters.blog</div>
			{ siteId && <Checklist siteId={ siteId } /> }
		</div>
	);
};

export default Sidebar;
