type Experiment = { [ key: string ]: string };
type Experiments = { [ key: string ]: Experiment };

const experiments: Experiments = {};
const PLANS_LIST_NAMESPACE = 'plans-list';

const setExperiment = ( namespace: string, experimentName: string, variation: string ): void => {
	if ( ! experiments[ namespace ] ) {
		experiments[ namespace ] = {};
	}
	experiments[ namespace ][ experimentName ] = variation;
};

const getExperiment = ( namespace: string, experimentName: string ): string | undefined => {
	return experiments[ namespace ]?.[ experimentName ];
};

export const setPlansListExperiment = ( experimentName: string, variation: string ): void => {
	setExperiment( PLANS_LIST_NAMESPACE, experimentName, variation );
};

export const getPlansListExperiment = ( experimentName: string ): string | undefined => {
	return getExperiment( PLANS_LIST_NAMESPACE, experimentName );
};

export type TrailMapVariantType =
	| 'control'
	| 'treatment_copy_and_structure'
	| 'treatment_copy'
	| 'treatment_structure';

export const setTrailMapExperiment = ( variation: TrailMapVariantType ): void => {
	setExperiment( PLANS_LIST_NAMESPACE, 'wpcom_trail_map_feature_structure_experiment', variation );
};

export const getTrailMapExperiment = () => {
	return ( getExperiment( PLANS_LIST_NAMESPACE, 'wpcom_trail_map_feature_structure_experiment' ) ??
		'control' ) as TrailMapVariantType;
};

export const isTrailMapControlVariant = ( variant = getTrailMapExperiment() ): boolean =>
	variant === 'control';

export const isTrailMapCopyVariant = ( variant = getTrailMapExperiment() ): boolean =>
	variant === 'treatment_copy_and_structure' || variant === 'treatment_copy';

export const isTrailMapStructureVariant = ( variant = getTrailMapExperiment() ): boolean =>
	variant === 'treatment_copy_and_structure' || variant === 'treatment_structure';

export const isTrailMapAnyVariant = ( variant = getTrailMapExperiment() ): boolean =>
	variant !== 'control';
