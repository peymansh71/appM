import React,{Component} from 'react';
import loadingImage from './loading.svg';

class Loading extends Component {

  render() {

    const style = {
      display:'flex',
      flexDirection:'column',
      justifyContent : 'center',
      alignItems : 'center',
      userSelect : 'none',
      background: 'none',
      zIndex : 800000
    }

    return  (
        <div style={style}>
         
          <img src={loadingImage} alt="loading"/>
          در حال بارگذاری
        </div>

    )
      
  }
}

export default Loading