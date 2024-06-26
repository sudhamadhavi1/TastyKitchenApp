import * as React from 'react'

const SortIcon = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_13799_11212"
      style={{maskType: 'alpha'}}
      maskUnits="userSpaceOnUse"
      x="3"
      y="6"
      width="18"
      height="12"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7ZM4 18H8C8.55 18 9 17.55 9 17C9 16.45 8.55 16 8 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM14 13H4C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11H14C14.55 11 15 11.45 15 12C15 12.55 14.55 13 14 13Z"
        fill="#0F172A"
      />
    </mask>
    <g mask="url(#mask0_13799_11212)">
      <rect width="24" height="24" fill="#475569" />
    </g>
  </svg>
)
export default SortIcon
