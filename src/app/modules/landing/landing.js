import React, { Component } from "react";
import styles from "./landing.scss";
import Header from "../header/header";
import Timeline from "../timeline/timeline";
import Loader from "../loader/loader";
import { landingPageBody } from "../../constants/landingConstants";
import Projects from "../projects/projects";
import Div from "Common/components/div";
import { Transition } from "react-spring/renderprops";

export default class Landing extends Component {
  state = {
    bodyType: landingPageBody.NONE,
  };

  constructor(props) {
    super(props);
    this.previousBodyType = landingPageBody.NONE;
  }
  
  updateBodyType = bodyType => {
    this.previousBodyType = this.state.bodyType;
    this.setState({ bodyType });
  };

  getBodyContent = () => ({
    [landingPageBody.TIMELINE]: props => (
      <Div
        fillParent
        animate
        style={props}
        className={styles.body_content_container}
      >
        <Timeline />
      </Div>
    ),
    [landingPageBody.PROJECT]: props => (
      <Div
        fillParent
        animate
        style={props}
        className={styles.body_content_container}
      >
        <Projects />
      </Div>
    )
  });

  render() {
    const { bodyType } = this.state;
    const bodyContent = this.getBodyContent();
    let fromAnimation, enterAnimation, leaveAnimation;
    
    if (this.previousBodyType == landingPageBody.NONE) {
      fromAnimation = {
        opacity: 0,
        marginTop: '100px',
        marginLeft: '0px'
      };
      enterAnimation = {
        opacity: 1,
        marginTop: '0px',
        marginLeft: '0px'
      }
      leaveAnimation = {
        opacity: 0,
        marginTop: '-100px',
        marginLeft: '0px'
      }
    }
    else if (bodyType == landingPageBody.TIMELINE) {
      fromAnimation = {
        opacity: 0,
        marginLeft: '-100px',
      };
      enterAnimation = {
        opacity: 1,
        marginLeft: '0px',
      };
      leaveAnimation = {
        opacity: 0,
        marginLeft: '100px',
      };
    } else if (bodyType == landingPageBody.PROJECT) {
      fromAnimation = {
        opacity: 0,
        marginLeft: '100px',
      };
      enterAnimation = {
        opacity: 1,
        marginLeft: '0px',
      };
      leaveAnimation = {
        opacity: 0,
        marginLeft: '-100px',
      };
    }

    return (
      <Div className={styles.landing_container}>
        <Loader>
          <React.Fragment>
            <Header updateBodyType={this.updateBodyType} />

            <Div fillParent className={styles.body_container}>
              <Transition
                items={bodyType}
                from={fromAnimation}
                enter={enterAnimation}
                leave={leaveAnimation}
              >
                {bodyType => bodyContent[bodyType]}
              </Transition>
            </Div>
          </React.Fragment>
        </Loader>
      </Div>
    );
  }
}
