import styled from 'styled-components';
const SidebarWrapper = styled.div`
    display: flex;
    width: 300px;
    padding: 20px 24px 996px 24px;
    align-items: flex-start;
    //position : fixed;

    .custom-border-bottom {
        border-bottom: 1px solid #E9ECEF; 
        width: 250px;
    }

      .custom-heading {
        color: black;
        font-size:14px;
      } 

       /* .custom-link:hover {
        color: red; 
      }  */

      .custom-link:active,
      .custom-link:focus {
        color: blue;
      }

      /* &:hover {
    color: red;
  }

  &:active, &:visited {
    color: blue;
  } */


    // .ps-sidebar-container{
    //     background-color:#fff; 
    // }
    // .ps-menuitem-root{
    //     .ps-menu-button{
    //                 color: var(--global-01-primary, #000);
    //                 font-family: "Inter";
    //                 font-size: 14px;
    //                 font-weight: 400;
    //                 line-height: 21px;

    //                 &:hover{
    //                     color:#007BFF;
    //                 }
    //     }
         /* &.ps-active{
             .ps-menu-button{
                 color:#007BFF;
             }
         } */
        
    // }
`;

// export const fancy=styled(SidebarWrapper)`

// `;
// {
//     DashboardAdjust: {
//         color: "var(--global-01-primary, #007BFF)",
//         // textAlign: "center",
//         fontFamily: "Inter",
//         fontSize: "14px",
//         fontStyle: "normal",
//         fontWeight: "400",
//         lineHeight: "21px", /* 150% */
//     },

//     ProductAdjust: {
//         color: "var(--global-08-dark, #343A40)",
//         // textAlign: "center",
//         fontFamily: "Inter",
//         fontSize: "14px",
//         fontStyle: "normal",
//         fontWeight: "400",
//         lineHeight: "21px", /* 150% */
//     },

//     OrderAdjust: {
//         color: "var(--global-08-dark, #343A40)",
//         // textAlign: "center",
//         fontFamily: "Inter",
//         fontSize: "14px",
//         fontStyle: "normal",
//         fontWeight: "400",
//         lineHeight: "21px", /* 150% */
//     },

//     ArrowAdjust: {
//         width: "16px",
//         height: "16px",
//     },

//     NavAdjust: {
//         display: "flex",
//         width: "349px",
//         height: "1168px",
//         padding: "20px 24px 996px 24px",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         gap: "16px",
//         flexShrink: "0",
//         borderRadius: "4px",
//         background: "var(--global-09-white, #FFF)",
//     }

// };
export default SidebarWrapper;