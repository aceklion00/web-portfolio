import React, { Component } from 'react';
import styles from './intro.scss';
import appStyles from '../../app.scss';

export default class Intro extends Component {

  state = {
    divPositionX: 0,
    divPositionY: 0,
    refObject: [
      {
        ref: React.createRef(),
        direction: 'init',
        isVisible: true,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
    ]
  }

  componentDidMount() {
    this.updatedivPositions(0);

    setTimeout(()=>{
      this.updatedivPositions(1);

      setTimeout(()=>{
        this.updatedivPositions(2);
      },2000);
 
      
    },2000);
  }

  updatedivPositions(referenceObjectIndex) {
    const { divPositionX, divPositionY, refObject } = this.state;
    const { ref : { current }, direction } = refObject[referenceObjectIndex];
//console.log(this.myInput.current.offsetWidth)
    const objectWidth = current.offsetWidth;
    const objectHeight = current.offsetHeight;

    //NOTE:- created this because the span has an additional padding above and below the text 
    //So the text doesn't look centered aligned although it is programatically correct
    const componentHeightPadding = 15; 

    if (direction == 'right') {
      refObject[referenceObjectIndex] = {...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        divPositionX: divPositionX + (objectWidth/2),
        refObject
      })
    } else if (direction == 'bottom') {
      const resultDivPositionX = Math.abs(divPositionX + (objectWidth/2));
      const resultDivPositionY = Math.abs((divPositionY + componentHeightPadding) + (objectHeight/2));
      refObject[referenceObjectIndex] = {...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        //divPositionX: resultDivPositionX,
        divPositionY: resultDivPositionY,
        refObject
      })
    } else if (direction == 'init') {
      this.setState({
        divPositionX: objectWidth/2,
        divPositionY: (objectHeight + componentHeightPadding)/2
      })
    }
  }

  render() {
    const introContainerStyle =  [
      appStyles['column'],
      appStyles['justify-center'],
      appStyles['align-center'],
      styles['intro-container'],
    ].join(' '); 

    const {
      divPositionY,
      divPositionX,
      refObject,
    } = this.state;

    return(
     <div className={introContainerStyle}>

       <div style={{
         position: 'absolute',
         transition: 'all 0.5s ease',
         top: `calc(50% - ${divPositionY}px)`,
         left: `calc(50% - ${divPositionX}px)`
       }}>
        <span ref={refObject[0].ref} className={styles['intro-text']}>
          Hi,
        </span>

        <div className={`${appStyles['column']} ${appStyles['align-center']}`} >
          
          <div className={`${appStyles['row']} ${appStyles['align-center']}`}>
            <span ref={refObject[1].ref} className={`${styles['intro-text']} ${styles['animate-bottom']} ${refObject[1].isVisible? styles['animate'] : ''}`}>
              some text &nbsp;
            </span>
            <span  ref={refObject[2].ref} className={`${styles['intro-text']} ${styles['animate-right']} ${refObject[2].isVisible? styles['animate'] : ''}`}>
              some text that i don't like
            </span>
          </div>
          <span  ref={refObject[3].ref} className={`${styles['intro-text']} ${styles['animate-bottom']} ${refObject[3].isVisible? styles['animate'] : ''}`}>
            some text is below
          </span>
          <span  ref={refObject[4].ref} className={`${styles['intro-text']} ${styles['animate-bottom']} ${refObject[4].isVisible? styles['animate'] : ''}`}>
            another text
          </span>
       </div>

       <div className={`${appStyles['column']} ${appStyles['align-center']} ${styles['intro-text-container2']}`}>
          <span  ref={refObject[5].ref} className={`${styles['intro-text']} ${styles['animate-right']} ${refObject[5].isVisible? styles['animate'] : ''}`}>
            somdasdjasld
          </span>
          <span  ref={refObject[6].ref} className={`${styles['intro-text']} ${styles['animate-bottom']} ${refObject[6].isVisible? styles['animate'] : ''}`}>
            asdjalksfjslkdjf
          </span>
          <span  ref={refObject[7].ref} className={`${styles['intro-text']} ${styles['animate-bottom']} ${refObject[7].isVisible? styles['animate'] : ''}`}>
            asdjalksfjslkdjf
          </span>
        </div>
      </div>

     </div>
    )
  }
}
