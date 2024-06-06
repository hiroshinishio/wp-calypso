import clsx from 'clsx';
import type { AkismetLogoType } from './types';

const AkismetLogo: AkismetLogoType = ( {
	className = '',
	size = { width: 100, height: 19 },
	color = '#000',
} ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 111 21"
			width={ size.width }
			height={ size.height }
			className={ clsx( 'akismet-logo', className ) }
			fill="none"
		>
			<path
				d="M11.1091 2.70377L16.6234 17.6425C17.0983 18.9215 17.8371 19.384 19.0772 19.4929C19.1227 19.4951 19.1673 19.5069 19.2082 19.5275C19.2491 19.5481 19.2856 19.5772 19.3152 19.6129C19.3449 19.6486 19.3671 19.6901 19.3806 19.735C19.3941 19.7799 19.3986 19.8271 19.3938 19.8738C19.3958 19.9222 19.3886 19.9704 19.3724 20.0158C19.3562 20.0612 19.3314 20.1029 19.2995 20.1383C19.2676 20.1737 19.2292 20.2023 19.1865 20.2223C19.1438 20.2423 19.0977 20.2533 19.0508 20.2548H13.0088C12.96 20.256 12.9114 20.247 12.866 20.2283C12.8207 20.2096 12.7795 20.1816 12.7449 20.146C12.7104 20.1104 12.6832 20.0679 12.6651 20.0211C12.6469 19.9743 12.6382 19.9242 12.6394 19.8738C12.6355 19.8258 12.6412 19.7775 12.6561 19.7319C12.6711 19.6862 12.695 19.6442 12.7263 19.6085C12.7576 19.5728 12.7958 19.5441 12.8383 19.5242C12.8809 19.5043 12.9269 19.4937 12.9736 19.4929C13.5805 19.4929 14.2664 19.3296 14.2664 18.5677C14.2613 18.2502 14.1986 17.9364 14.0818 17.6425L12.7625 14.0144C12.7098 13.8512 12.6834 13.7877 12.5251 13.7877H7.49451C6.70299 13.7877 5.73557 13.7877 5.27824 14.8217L4.06457 17.6425C3.93961 17.897 3.86487 18.1744 3.8447 18.4589C3.8447 19.4385 5.08476 19.4929 5.74436 19.4929C5.79181 19.4924 5.83883 19.5021 5.88242 19.5215C5.92601 19.5408 5.96521 19.5693 5.99749 19.6052C6.02978 19.641 6.05445 19.6835 6.06993 19.7297C6.0854 19.776 6.09134 19.8251 6.08735 19.8738C6.08856 19.9242 6.07983 19.9743 6.0617 20.0211C6.04356 20.0679 6.0164 20.1104 5.98185 20.146C5.94731 20.1816 5.90611 20.2096 5.86075 20.2283C5.81539 20.247 5.76681 20.256 5.71798 20.2548H0.370785C0.321948 20.256 0.273376 20.247 0.228015 20.2283C0.182655 20.2096 0.141452 20.1816 0.106909 20.146C0.0723658 20.1104 0.0452019 20.0679 0.0270659 20.0211C0.00892994 19.9743 0.00020024 19.9242 0.00140664 19.8738C-0.00292339 19.825 0.00277013 19.7758 0.0181164 19.7293C0.0334627 19.6829 0.0581175 19.6404 0.0904753 19.6044C0.122833 19.5685 0.162168 19.54 0.205919 19.5208C0.249669 19.5015 0.296854 19.4921 0.344401 19.4929C1.63723 19.4113 2.05937 18.7854 2.56067 17.6425L8.91926 3.2752C9.20948 2.64935 9.8427 2.10513 10.4232 2.10513C10.8453 2.10513 10.9772 2.35003 11.1091 2.70377ZM6.27204 12.4543C6.21928 12.5632 6.21928 12.5904 6.21928 12.6176C6.21928 12.6448 6.27204 12.6992 6.37758 12.6992H11.6104C11.9798 12.6992 12.1381 12.6176 12.1381 12.3727C12.1371 12.2502 12.1101 12.1295 12.059 12.019L10.6078 7.98268C10.2648 7.05751 9.76355 5.83302 9.60524 4.82622C9.60524 4.7718 9.57886 4.74459 9.55247 4.74459C9.52609 4.74459 9.49971 4.7718 9.49971 4.82622C9.30283 5.52234 9.04679 6.19919 8.73457 6.8489L6.27204 12.4543Z"
				fill={ color }
			/>
			<path
				d="M26.4432 4.28185C26.4432 3.24783 25.5462 2.9213 24.1742 2.9213C24.1284 2.80892 24.1016 2.68928 24.095 2.56756C24.1007 2.43413 24.1512 2.30689 24.2379 2.20761C24.3245 2.10833 24.4419 2.0432 24.57 2.02334C25.3846 1.82327 26.1606 1.48289 26.8654 1.01654C27.2084 0.771642 27.4458 0.499533 27.9252 0.499533C28.0417 0.493526 28.1576 0.520839 28.26 0.57846C28.3624 0.636081 28.4474 0.721768 28.5056 0.826063L28.1098 12.9349C28.1098 12.9893 28.1098 13.0165 28.1362 13.0165C28.1626 13.0165 28.1626 12.9893 28.2154 12.9349L31.9048 9.56983C32.3797 9.13446 32.5644 8.97119 32.5644 8.64466C32.5644 8.26371 32.3269 7.90997 31.4035 7.90997C31.356 7.91045 31.309 7.90072 31.2654 7.88138C31.2218 7.86204 31.1826 7.83353 31.1503 7.79767C31.118 7.76181 31.0934 7.71939 31.0779 7.67313C31.0624 7.62686 31.0565 7.57778 31.0605 7.52901C31.0605 7.28411 31.1924 7.17527 31.4299 7.17527H37.0233C37.0707 7.17081 37.1184 7.17668 37.1634 7.1925C37.2084 7.20833 37.2497 7.23376 37.2845 7.26713C37.3194 7.3005 37.347 7.34107 37.3656 7.38619C37.3843 7.43131 37.3935 7.47998 37.3927 7.52901C37.3975 7.57574 37.3931 7.62299 37.3795 7.66787C37.366 7.71275 37.3438 7.7543 37.3141 7.78998C37.2845 7.82566 37.248 7.85471 37.2071 7.87534C37.1662 7.89598 37.1216 7.90776 37.0761 7.90997C35.7569 8.10044 34.4376 8.88956 33.4878 9.70588L29.9699 12.8079L33.1624 16.2093C33.7692 16.8623 34.4025 17.6243 35.1412 18.1957C35.7738 18.7357 36.5631 19.0421 37.3839 19.0664C37.7005 19.0664 37.9116 19.012 38.0963 19.012C38.2809 19.012 38.2809 19.1753 38.2809 19.2569C38.283 19.322 38.2723 19.3868 38.2497 19.4475C38.227 19.5083 38.1928 19.5638 38.149 19.6106C37.9757 19.7978 37.7808 19.9623 37.5686 20.1004C37.0296 20.3677 36.4384 20.5042 35.8404 20.4995C35.0722 20.5107 34.3216 20.2622 33.7033 19.7921C33.1025 19.299 32.5621 18.7325 32.0939 18.105L28.211 13.4519C28.1582 13.3975 28.1582 13.3703 28.1318 13.3703C28.1054 13.3703 28.1054 13.3975 28.1054 13.4519L27.9735 17.4519C27.9735 18.6492 28.7387 19.266 29.8996 19.4655C29.9948 19.4797 30.0818 19.5287 30.1448 19.6037C30.2078 19.6787 30.2425 19.7745 30.2426 19.8737C30.243 19.9226 30.2336 19.9711 30.2148 20.0161C30.1961 20.061 30.1684 20.1015 30.1337 20.1348C30.0989 20.1681 30.0578 20.1935 30.0129 20.2095C29.9681 20.2254 29.9205 20.2315 29.8732 20.2274H23.9675C23.9206 20.2299 23.8737 20.2226 23.8295 20.206C23.7854 20.1894 23.7449 20.1639 23.7105 20.1309C23.676 20.098 23.6484 20.0582 23.6291 20.014C23.6098 19.9699 23.5993 19.9221 23.5981 19.8737C23.5932 19.7732 23.6261 19.6745 23.69 19.5985C23.754 19.5224 23.8439 19.4748 23.9411 19.4655C25.2603 19.275 25.9991 18.8397 26.0255 17.6152L26.4432 4.28185Z"
				fill={ color }
			/>
			<path
				d="M42.0107 10.6221C42.0107 9.58812 41.3248 9.23438 39.9528 9.23438C39.8989 9.13465 39.8716 9.02199 39.8736 8.90785C39.8781 8.77401 39.9281 8.64607 40.015 8.54653C40.1018 8.44699 40.22 8.38223 40.3485 8.36363C41.1058 8.16368 41.8212 7.82246 42.4593 7.35683C42.7759 7.13007 43.0397 6.83982 43.4883 6.83982C43.6094 6.82393 43.7321 6.85008 43.8372 6.91413C43.9423 6.97818 44.0238 7.07649 44.0687 7.19356L43.7565 16.5995C43.7565 18.0961 43.9148 19.1845 45.6298 19.4566C45.727 19.4658 45.8169 19.5135 45.8809 19.5895C45.9448 19.6656 45.9777 19.7642 45.9728 19.8648C45.9746 19.9149 45.966 19.9648 45.9475 20.0112C45.929 20.0576 45.9012 20.0994 45.8658 20.1337C45.8304 20.1681 45.7883 20.1942 45.7422 20.2104C45.6962 20.2266 45.6474 20.2325 45.599 20.2276H39.6889C39.6435 20.2292 39.5982 20.2211 39.5559 20.2039C39.5136 20.1867 39.4752 20.1607 39.443 20.1275C39.4108 20.0943 39.3856 20.0547 39.3689 20.0111C39.3522 19.9674 39.3444 19.9207 39.3459 19.8738C39.3354 19.7764 39.3629 19.6787 39.4223 19.6021C39.4817 19.5256 39.5681 19.4765 39.6626 19.4657C41.5094 19.2208 41.7469 18.2956 41.7997 16.6357L42.0107 10.6221ZM44.4645 2.10512C44.4645 3.08472 43.884 3.65614 42.9078 3.65614C41.9316 3.65614 41.5094 3.13914 41.5094 2.32281C41.5094 1.31601 42.0899 0.77179 43.0485 0.77179C44.0423 0.77179 44.4645 1.2888 44.4645 2.10512Z"
				fill={ color }
			/>
			<path
				d="M56.7038 9.01671C56.7038 9.45208 56.6247 10.4045 56.6247 10.5677C56.6164 10.6304 56.5879 10.6883 56.5438 10.7322C56.4997 10.7761 56.4426 10.8034 56.3816 10.8096C56.3206 10.8159 56.2594 10.8008 56.2077 10.7668C56.1561 10.7328 56.1171 10.6818 56.097 10.6221C55.7804 8.88065 54.382 8.06433 53.0364 8.06433C51.6908 8.06433 50.6178 8.7446 50.6178 10.1051C50.6178 11.4657 52.412 12.0915 53.4937 12.5995C54.9185 13.307 56.3696 13.8512 56.8709 15.1845C57.0015 15.547 57.0642 15.9317 57.0556 16.3183C57.0584 16.7742 56.9778 17.2265 56.8181 17.6516C56.1058 19.5292 53.9598 20.4816 51.9107 20.4816C48.8765 20.4816 48.3488 19.502 48.3488 17.3251V16.6358C48.3453 16.6003 48.35 16.5644 48.3624 16.5312C48.3749 16.4979 48.3947 16.4681 48.4204 16.4442C48.4461 16.4204 48.4769 16.4031 48.5103 16.3938C48.5437 16.3846 48.5788 16.3835 48.6126 16.3909C48.8325 16.3909 48.8765 16.4997 48.8765 16.5269C49.4569 18.214 51.1455 19.248 52.7286 19.248C53.995 19.248 55.1295 18.5677 55.1295 17.2888C55.1295 15.5473 53.652 15.2208 52.3064 14.5405C51.0664 13.9147 49.7472 13.4249 49.0875 12.3909C48.8439 11.9449 48.7138 11.4424 48.7094 10.9305C48.7143 10.47 48.8132 10.0157 48.9996 9.59721C49.69 8.06433 51.5325 6.84891 53.8279 6.84891C56.1233 6.84891 56.7038 7.60174 56.7038 9.01671Z"
				fill={ color }
			/>
			<path
				d="M75.8535 8.11878C76.3812 8.88068 76.4867 9.80585 76.4867 10.595C76.4867 10.6766 76.5131 10.7038 76.5395 10.7038C76.5659 10.7038 76.5923 10.6766 76.6187 10.6222C77.3354 8.47252 79.0768 6.84894 81.3722 6.84894C84.3008 6.84894 84.8549 9.27071 84.8549 11.2571L84.6702 16.6449C84.6702 18.1687 84.8901 19.2027 86.5699 19.4748C86.6201 19.4765 86.6695 19.4885 86.7153 19.51C86.7611 19.5314 86.8023 19.562 86.8366 19.5999C86.8709 19.6378 86.8976 19.6823 86.9152 19.7309C86.9329 19.7795 86.941 19.8311 86.9393 19.8829C86.9388 19.934 86.9277 19.9844 86.907 20.0307C86.8862 20.0771 86.8561 20.1183 86.8186 20.1518C86.7812 20.1852 86.7374 20.2101 86.6899 20.2247C86.6425 20.2394 86.5926 20.2434 86.5435 20.2367H80.6598C80.6125 20.2412 80.5647 20.2353 80.5197 20.2195C80.4747 20.2036 80.4335 20.1782 80.3986 20.1448C80.3638 20.1115 80.3361 20.0709 80.3175 20.0258C80.2988 19.9806 80.2896 19.932 80.2905 19.8829C80.2835 19.8323 80.2872 19.7807 80.3013 19.7316C80.3154 19.6825 80.3394 19.6371 80.3719 19.5984C80.4044 19.5597 80.4446 19.5287 80.4897 19.5074C80.5348 19.486 80.5838 19.4749 80.6334 19.4748C82.4803 19.2299 82.6914 18.2775 82.7442 16.6449L82.8761 12.5632C82.8761 10.7129 82.5595 8.78091 80.396 8.78091C77.7048 8.78091 76.6582 11.3659 76.5703 13.6789L76.4648 16.6449C76.4648 18.1687 76.6846 19.2027 78.3644 19.4748C78.4133 19.4773 78.4611 19.49 78.5051 19.5121C78.5491 19.5342 78.5883 19.5653 78.6203 19.6034C78.6524 19.6416 78.6766 19.686 78.6916 19.734C78.7065 19.782 78.7119 19.8327 78.7074 19.8829C78.7067 19.9311 78.6963 19.9786 78.677 20.0225C78.6578 20.0664 78.6299 20.1057 78.5953 20.138C78.5607 20.1703 78.5199 20.195 78.4757 20.2104C78.4314 20.2258 78.3846 20.2317 78.338 20.2276H72.428C72.3825 20.2292 72.3372 20.2211 72.2949 20.2039C72.2526 20.1867 72.2142 20.1607 72.182 20.1275C72.1499 20.0944 72.1247 20.0547 72.108 20.0111C72.0913 19.9675 72.0835 19.9208 72.085 19.8739C72.0775 19.8253 72.08 19.7756 72.0922 19.7281C72.1045 19.6805 72.1262 19.6361 72.156 19.5977C72.1857 19.5593 72.223 19.5277 72.2653 19.505C72.3076 19.4823 72.354 19.4689 72.4016 19.4657C74.2485 19.2208 74.4859 18.2684 74.5387 16.6358L74.6706 12.5542C74.6706 10.7038 74.3276 8.77184 72.1641 8.77184C69.4466 8.77184 68.4264 11.4657 68.3384 13.7786L68.2329 16.6358C68.2329 18.1324 68.4176 19.1936 70.1326 19.4657C70.1814 19.4683 70.2293 19.481 70.2733 19.5031C70.3172 19.5252 70.3564 19.5562 70.3885 19.5943C70.4205 19.6325 70.4447 19.6769 70.4597 19.7249C70.4747 19.773 70.4801 19.8236 70.4756 19.8739C70.4782 19.9234 70.4703 19.973 70.4523 20.019C70.4343 20.065 70.4066 20.1064 70.3714 20.1402C70.3361 20.1739 70.2941 20.1993 70.2482 20.2144C70.2024 20.2295 70.1539 20.234 70.1062 20.2276H64.2225C64.1737 20.2326 64.1245 20.2273 64.0778 20.212C64.0311 20.1967 63.9879 20.1717 63.9508 20.1386C63.9138 20.1055 63.8837 20.0649 63.8623 20.0194C63.841 19.9739 63.8289 19.9244 63.8267 19.8739C63.8206 19.8211 63.8257 19.7675 63.8417 19.717C63.8577 19.6664 63.8842 19.6201 63.9194 19.5812C63.9546 19.5424 63.9976 19.5119 64.0454 19.4919C64.0932 19.472 64.1446 19.463 64.1961 19.4657C66.0166 19.2208 66.2541 18.2956 66.3069 16.6358L66.4916 10.7582C66.4916 9.69701 65.5945 9.37048 64.1961 9.37048C64.1482 9.26844 64.1212 9.15726 64.117 9.04395C64.1216 8.90728 64.1711 8.7763 64.2574 8.67247C64.3437 8.56865 64.4616 8.49814 64.5919 8.47252C65.4035 8.27674 66.1788 7.94587 66.8873 7.49293C67.2303 7.22082 67.4678 6.94871 67.9163 6.94871C68.0401 6.93846 68.1641 6.96667 68.2722 7.02972C68.3804 7.09276 68.4678 7.18775 68.5231 7.30245L68.2593 10.595C68.2593 10.6766 68.2857 10.7038 68.3121 10.7038C68.3384 10.7038 68.3648 10.6766 68.3912 10.6222C69.2091 8.39089 70.8977 6.84894 73.1404 6.84894C74.4859 6.84894 75.3302 7.38408 75.8535 8.11878Z"
				fill={ color }
			/>
			<path
				d="M98.8146 10.4317C98.8146 10.9215 98.7091 11.8195 98.2078 12.1188C96.5983 13.044 93.0057 13.4249 90.4772 13.4249C90.3717 13.4249 90.3453 13.4793 90.3453 13.561C90.3495 14.2272 90.4563 14.8885 90.6619 15.5202C91.3215 17.4521 92.8606 18.468 94.6987 18.468C95.4534 18.4664 96.1977 18.2865 96.8746 17.9421C97.5515 17.5978 98.1429 17.0982 98.6035 16.4816C98.6328 16.4189 98.6774 16.365 98.7329 16.3252C98.7884 16.2855 98.8529 16.2613 98.9201 16.2549C98.9654 16.2502 99.0111 16.255 99.0545 16.2691C99.0978 16.2832 99.138 16.3061 99.1725 16.3367C99.2071 16.3672 99.2352 16.4046 99.2553 16.4467C99.2754 16.4887 99.2871 16.5346 99.2895 16.5814C99.284 16.6392 99.266 16.695 99.2367 16.7447C98.155 19.2753 95.9651 20.4998 93.8852 20.4998C90.3673 20.4725 88.6875 17.4249 88.6875 14.4861C88.6875 11.0848 90.8862 6.83989 94.9933 6.83989C97.2052 6.84896 98.8146 8.49975 98.8146 10.4317ZM90.5828 11.3388C90.5293 11.5268 90.4853 11.7175 90.4508 11.9102C90.4113 12.0956 90.3834 12.2834 90.3673 12.4725C90.3712 12.5049 90.3871 12.5343 90.4118 12.5547C90.4364 12.575 90.4678 12.5846 90.4992 12.5814C92.5572 12.5814 96.7786 11.8195 96.7786 11.112C96.756 10.3883 96.4636 9.70154 95.9623 9.19466C95.461 8.68778 94.7894 8.39988 94.0875 8.39091C92.2713 8.39091 91.0577 9.77866 90.5872 11.3297L90.5828 11.3388Z"
				fill={ color }
			/>
			<path
				d="M103.144 9.04411C103.144 8.90805 103.091 8.85363 102.906 8.85363H101.112C101.032 8.8178 100.965 8.75583 100.922 8.6772C100.88 8.59857 100.863 8.50762 100.875 8.41825C100.874 8.34126 100.897 8.26597 100.939 8.20266C100.982 8.13936 101.042 8.09111 101.112 8.06451C102.827 7.43866 103.698 6.2686 104.226 4.01009C104.267 3.90361 104.341 3.814 104.436 3.75502C104.531 3.69604 104.643 3.67093 104.753 3.68356C105.044 3.68356 105.255 3.79241 105.255 4.06451L105.149 7.23912C105.149 7.34796 105.175 7.42959 105.334 7.42959H109.291C109.384 7.47201 109.462 7.54054 109.518 7.62723C109.574 7.71393 109.606 7.81523 109.608 7.91939C109.607 8.03854 109.567 8.15386 109.495 8.24739C109.424 8.34091 109.324 8.40737 109.212 8.4364L105.123 8.84456L104.881 16.0645C104.881 16.7448 104.881 17.5339 105.382 18.0781C105.58 18.2922 105.819 18.4609 106.084 18.5734C106.35 18.686 106.635 18.7397 106.921 18.7312C107.801 18.7312 108.663 18.3502 109.56 17.4251C109.583 17.3985 109.611 17.3774 109.643 17.3633C109.675 17.3492 109.71 17.3424 109.744 17.3434C109.78 17.3407 109.815 17.3459 109.848 17.3586C109.882 17.3713 109.912 17.3913 109.937 17.4171C109.962 17.4429 109.981 17.474 109.993 17.5083C110.006 17.5425 110.011 17.5791 110.008 17.6155C109.993 17.7215 109.957 17.8233 109.903 17.9149C109.269 19.4115 107.792 20.4999 105.892 20.4999C105.487 20.52 105.083 20.453 104.704 20.3031C104.326 20.1532 103.981 19.9237 103.694 19.6291C103.012 18.9217 102.902 17.9149 102.902 16.9625L103.144 9.04411Z"
				fill={ color }
			/>
			<path
				d="M21.1954 11.8056C21.1954 12.5041 20.8106 12.9009 20.1181 12.9009C19.4255 12.9009 19.1484 12.5358 19.1484 11.9802C19.1484 11.2818 19.5486 10.885 20.2258 10.885C20.903 10.885 21.1954 11.266 21.1954 11.8056Z"
				fill={ color }
			/>
			<path
				d="M61.8048 11.8057C61.8048 12.5041 61.42 12.9009 60.7274 12.9009C60.0349 12.9009 59.7578 12.5358 59.7578 11.9803C59.7578 11.2819 60.158 10.885 60.8352 10.885C61.5124 10.885 61.8048 11.266 61.8048 11.8057Z"
				fill={ color }
			/>
		</svg>
	);
};

export default AkismetLogo;
