import { ReactElement } from 'react';
import { ThemeBlock } from 'calypso/components/themes-list';
import './style.scss';

interface ThemeCollectionProps {
	heading: string;
	themes: Array< never >;
	collectionSlug: string;
	getScreenshotUrl: ( themeId: string ) => string;
	siteId: string;
	getButtonOptions: () => void;
	getActionLabel: () => string;
	isActive: () => boolean;
	getPrice: () => string;
	isInstalling: () => boolean;
}

export default function ThemeCollection( {
	collectionSlug,
	heading,
	themes,
	getScreenshotUrl,
	siteId,
	getButtonOptions,
	getActionLabel,
	isActive,
	getPrice,
	isInstalling,
}: ThemeCollectionProps ): ReactElement {
	return (
		<div className="theme-collection__container">
			<h2>{ heading }</h2>
			{ themes.map( ( theme, index ) => (
				<div>
					<ThemeBlock
						getScreenshotUrl={ getScreenshotUrl }
						key={ `theme-collection-${ collectionSlug }-${ index }` }
						theme={ theme }
						siteId={ siteId }
						isActive={ isActive }
						getButtonOptions={ getButtonOptions }
						getActionLabel={ getActionLabel }
						getPrice={ getPrice }
						isInstalling={ isInstalling }
					/>
				</div>
			) ) }
		</div>
	);
}
