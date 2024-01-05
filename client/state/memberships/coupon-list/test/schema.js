import couponListSchema, { metadataSchema, metaKeytoSchemaKeyMap } from '../schema';

describe( 'schema', () => {
	describe( 'couponListSchema', () => {
		test( 'should return the correct schema', () => {
			expect( couponListSchema ).toEqual( {
				type: 'object',
				additionalProperties: false,
				patternProperties: {
					'^\\d+$': {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								ID: { type: 'number' },
								coupon_code: { type: 'string', metaKey: 'scoup_coupon_code' },
								discount_type: { type: 'string', metaKey: 'scoup_discount_type' },
								discount_value: { type: 'number', metaKey: 'scoup_discount_value' },
								discount_percentage: { type: 'number', metaKey: 'scoup_discount_percentage' },
								start_date: { type: 'string', metaKey: 'scoup_start_date' },
								end_date: { type: 'string', metaKey: 'scoup_end_date' },
								plan_ids_allow_list: { type: 'array', metaKey: 'scoup_plan_ids_allow_list' },
								cannot_be_combined: { type: 'boolean', metaKey: 'scoup_cannot_be_combined' },
								first_time_purchase_only: {
									type: 'boolean',
									metaKey: 'scoup_first_time_purchase_only',
								},
								duration: { type: 'string', metaKey: 'scoup_duration' },
								email_allow_list: { type: 'array', metaKey: 'scoup_email_allow_list' },
							},
						},
					},
				},
			} );

			expect( metadataSchema ).toEqual( {
				coupon_code: { type: 'string', metaKey: 'scoup_coupon_code' },
				discount_type: { type: 'string', metaKey: 'scoup_discount_type' },
				discount_value: { type: 'number', metaKey: 'scoup_discount_value' },
				discount_percentage: { type: 'number', metaKey: 'scoup_discount_percentage' },
				start_date: { type: 'string', metaKey: 'scoup_start_date' },
				end_date: { type: 'string', metaKey: 'scoup_end_date' },
				plan_ids_allow_list: { type: 'array', metaKey: 'scoup_plan_ids_allow_list' },
				cannot_be_combined: { type: 'boolean', metaKey: 'scoup_cannot_be_combined' },
				first_time_purchase_only: { type: 'boolean', metaKey: 'scoup_first_time_purchase_only' },
				duration: { type: 'string', metaKey: 'scoup_duration' },
				email_allow_list: { type: 'array', metaKey: 'scoup_email_allow_list' },
			} );

			expect( metaKeytoSchemaKeyMap ).toEqual( {
				scoup_coupon_code: 'coupon_code',
				scoup_discount_type: 'discount_type',
				scoup_discount_value: 'discount_value',
				scoup_discount_percentage: 'discount_percentage',
				scoup_start_date: 'start_date',
				scoup_end_date: 'end_date',
				scoup_plan_ids_allow_list: 'plan_ids_allow_list',
				scoup_cannot_be_combined: 'cannot_be_combined',
				scoup_first_time_purchase_only: 'first_time_purchase_only',
				scoup_duration: 'duration',
				scoup_email_allow_list: 'email_allow_list',
			} );
		} );
	} );
} );
