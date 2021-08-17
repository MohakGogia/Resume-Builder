import React from 'react';
import {skinCodes} from '../../constants/typeCodes';
// import * as actionTypes from '../../actions/actionTypes';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";
import uuid from "react-uuid"
import { useHistory } from "react-router-dom";

function GettingStarted(props) {
     let history = useHistory();

     const setSkinCode = async (skinCode) => {
        //console.log(skinCode);
        //skinCode k according document ki css apply hojaegi and move on to next page
        if(props.document.id == null){
            let newDocument = {
                id : uuid(),
                skinCode : skinCode
            }
            props.setSkin(newDocument);
            //  props.updateDocument(props.document.id, skinCode);        
        }
        else{
            props.updateSkin(skinCode);
            //  props.setDocument(skinCode); 
        }
        history.push('/contact');
      }

      
        return (  
            <div className="container med gettingStarted">
                <div className="section">
                    <h1 className=" center">
                    Select a resume template to get started</h1>
                    <p className=" center">
                    You’ll be able to edit and change this template later!
                    </p>
                    <div className="styleTemplate ">
                    {
                        skinCodes.map((skinCode,index) => {
                            return( <div key={index} className="template-card rounded-border">
                                  <i className={ skinCode == props.document.skinCode ? 'selected fa fa-check' :'hide' } ></i>
                                <img  className='' src={'/images/' + skinCode + '.svg'}/>
                                <button type="button" onClick={()=>setSkinCode(skinCode)}  className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);
    
                        })
                    }
                    </div>
                
                </div>
            </div>
        );
    
}
  
function mapStateToProps(store){
    return {
        document: store.document
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSkin : (document) => { dispatch( {type:"SET_SKIN", payload:document} ) }, // payload m document k data ja rha h set hone k liye
        updateSkin : (skinCode)=>{ dispatch( {type:"UPDATE_SKIN", payload:skinCode} ) }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted);
