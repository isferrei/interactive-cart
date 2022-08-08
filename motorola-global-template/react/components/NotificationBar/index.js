import React from "react";
import { NotificationBar as VtexNotificationBar } from "vtex.store-components";
import styles from "./styles.css";
var windowWidthVal = window.innerWidth;
class NotificationBar extends React.Component {
  static schema = {
    title: "Notification Bar",
    description: "Notification Bar",
    type: "object",
    properties: {
      content: {
        title: "Content",
        type: "string"
      },
      isVisible: {
        title: "Show?",
        type: "boolean",
        default: false
      }
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.callResizeMethod.bind(this));
  }

  componentDidUpdate() {
      this.resize();    
  }

  componentWillReceiveProps() { 
      this.resize();    
  }

  callResizeMethod(){
    const windowSize = window.innerWidth;
    if(windowSize < 1119 && windowSize == windowWidthVal){
     // do nothing for mobile scroll
    }else{
      this.resize();
      windowWidthVal = windowSize;
    }
  }
 
  resize() {
    const subNav = document.querySelector(".sub-nav");
    const mainheader = document.querySelector(".main-header");
    const dropdown = document.querySelector(".sidedrawer");     
  
    if (this.props != undefined && this.props.isVisible && !this.props.isPageHeader) {
      if (window.innerWidth > 1119) {
        window.document.body.style.paddingTop = "126px";
        if (subNav) subNav.style.top = "48px";
        if (dropdown) dropdown.style.paddingTop = "50px";
        if (mainheader) mainheader.style.top = "77px";
      } else if (window.innerWidth <= 1119) {
        window.document.body.style.paddingTop = "102px";
        if (dropdown) dropdown.style.paddingTop = "100px";
        if (mainheader) mainheader.style.top = "48px";
      }
    } else {
      if (window.innerWidth > 1119) {
        window.document.body.style.paddingTop = "78px";
        if (dropdown) dropdown.style.paddingTop = "50px";
        if (subNav) subNav.style.top = "0px";
        if (mainheader) mainheader.style.top = "29px";
      } else if (window.innerWidth <= 1119) {
        if (dropdown) dropdown.style.paddingTop = "50px";
        window.document.body.style.paddingTop = "54px";
        if (mainheader) mainheader.style.top = "0px";
      }
    }  
  
  }

  render() {
    if (this.props.isVisible && !this.props.isPageHeader) {
      return (
        <div className={styles.notificationBar}>
          <VtexNotificationBar content={this.props.content} />
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default NotificationBar;
