const BloombergLogo = ( props: React.SVGProps< SVGSVGElement > ) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={ 69 } height={ 27 } fill="none" { ...props }>
		<title>WordPress VIP client logo for Bloomberg</title>
		<mask
			id="a"
			width={ 68 }
			height={ 13 }
			x={ 0 }
			y={ 8 }
			maskUnits="userSpaceOnUse"
			style={ {
				maskType: 'alpha',
			} }
		>
			<path fill="#fff" d="M67.759 8H.5v12.395h67.259V8Z" />
		</mask>
		<g fill="#50575E" mask="url(#a)">
			<path d="M.498 8.002H5.43c.94 0 1.644.234 2.166.625.574.468.887 1.145.887 1.979 0 .963-.392 1.562-1.174 1.927v.052c1.043.338 1.643 1.276 1.643 2.395 0 1.068-.417 1.901-1.095 2.422-.574.417-1.305.599-2.296.599H.498v-10Zm4.436 3.906c.521 0 .913-.287.913-.886 0-.573-.392-.859-.94-.859H3.213v1.719h1.722v.026Zm.234 3.88c.6 0 1.044-.365 1.044-1.016 0-.703-.47-1.015-1.044-1.015h-1.93v2.057h1.93v-.026ZM9.396 8.002h2.583v10.025H9.396V8.002ZM12.5 14.462c0-2.265 1.462-3.775 3.732-3.775 2.27 0 3.704 1.536 3.704 3.775 0 2.266-1.434 3.776-3.704 3.776-2.27 0-3.731-1.51-3.731-3.776Zm4.854 0c0-1.25-.392-2.03-1.174-2.03-.783 0-1.148.78-1.148 2.03 0 1.25.365 2.057 1.148 2.057.782-.026 1.174-.807 1.174-2.057ZM20.222 14.462c0-2.265 1.461-3.775 3.731-3.775 2.27 0 3.679 1.51 3.679 3.775 0 2.266-1.435 3.776-3.705 3.776-2.244 0-3.705-1.51-3.705-3.776Zm4.853 0c0-1.25-.392-2.03-1.174-2.03-.783 0-1.148.78-1.148 2.03 0 1.25.365 2.057 1.148 2.057.782-.026 1.174-.807 1.174-2.057ZM28.152 10.88h2.4v1.068h.052c.47-.833 1.122-1.276 2.166-1.276.913 0 1.591.443 1.93 1.224h.053c.574-.937 1.33-1.224 2.217-1.224 1.67 0 2.375 1.224 2.375 2.865v4.478H36.84V13.98c0-.729-.235-1.197-.861-1.197s-.94.572-.94 1.354v3.88h-2.504v-4.037c0-.729-.235-1.197-.86-1.197-.627 0-.94.572-.94 1.354v3.88h-2.583V10.88ZM42.503 17.064h-.026V18h-2.4V8h2.505v3.594h.052c.47-.625 1.122-.963 2.035-.963 1.8 0 2.844 1.614 2.844 3.776 0 2.421-1.122 3.827-3 3.827-.783 0-1.592-.364-2.01-1.171Zm2.427-2.683c0-1.145-.418-1.9-1.174-1.9-.783 0-1.253.755-1.253 1.9 0 1.146.496 1.901 1.253 1.901.756 0 1.174-.729 1.174-1.9ZM47.802 14.448c0-2.24 1.487-3.776 3.626-3.776 1.07 0 1.879.339 2.505.938.835.807 1.2 2.057 1.174 3.515h-4.8c.104.885.521 1.354 1.278 1.354.443 0 .835-.208.991-.677h2.427c-.418 1.64-1.696 2.448-3.496 2.448-2.218-.026-3.705-1.537-3.705-3.802Zm2.505-.755h2.296c-.053-.86-.522-1.302-1.123-1.302-.704-.026-1.095.469-1.173 1.302ZM57.948 12.099h.053c.521-.99 1.2-1.38 2.06-1.38.21 0 .34.026.418.078v2.187h-.052c-1.487-.26-2.348.443-2.348 2.057v2.995h-2.531v-7.161h2.4v1.224ZM60.744 18.032h2.426c.104.313.417.599 1.017.599.81 0 1.096-.495 1.096-1.25v-.52h-.052c-.391.468-.94.806-1.722.806-1.54 0-2.896-1.145-2.896-3.385 0-2.057 1.096-3.645 2.766-3.645.965 0 1.539.39 1.93.99h.053v-.782h2.4v6.197c0 1.146-.392 2.032-.992 2.552-.626.547-1.513.782-2.53.782-1.93.026-3.261-.756-3.496-2.344Zm4.644-3.854c0-.885-.418-1.614-1.148-1.614-.705 0-1.148.625-1.148 1.614 0 .964.443 1.64 1.148 1.64.704 0 1.148-.702 1.148-1.64Z" />
		</g>
	</svg>
);
export { BloombergLogo };
