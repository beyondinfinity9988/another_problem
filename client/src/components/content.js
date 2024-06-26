import ComputerScreen from './computerScreen'
import Title from './title'
import Problemset from './problemset'
import React from 'react';
import axios from 'axios';
import Emoji from './emoji';

// import MediaQuery from 'react-responsive'

const contentStyle = {
    alignItems: "flex-start",
    display: "flex",
    flex: "1 1 auto",
    // height: "calc(100% - 11vh)",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    // gap: "3rem",
    margin: "0 7.5vh",
};

const titleAlignment = {
    display: "flex",
    flex: "0 0 auto",
    width: "70vh",
    marginTop: "13.5vh",
};

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curPage: "home",
            userHandle: "UNKNOWN_USER",
            curDifficulty: 1300,
            lastPageRequest: "home",
        };
    }


    async componentDidMount() {
        const currentData = (await axios.get('/get-current-session')).data;
        const newState = {
            curPage: currentData.curPage,
            userHandle: currentData.userHandle,
            curDifficulty: currentData.curDifficulty,
            lastPageRequest: currentData.lastPageRequest,
        };
        this.setState(newState);
    }

    render() {
        const contentStyleMobile = structuredClone(contentStyle);
        contentStyleMobile.flexFlow = "column nowrap";

        if (this.state.curPage === "home") {
            return (
                <div style={ { marginTop: "4vh", display: "flex", flex: "1 1 auto", flexFlow: "column nowrap", justifyContent: "space-between", alignItems: "center" } }>
                    <Title type="big" textAlign="center" fontSize="11.5vh" lineHeight="17vh" />
                    <Emoji fontSize="30vh" />
                </div>
            );
        }

        if (this.state.curPage === "login") {
            return (
                <div style={contentStyle}>
                    <div style={ titleAlignment }>
                        <Title type="small" textAlign="left" fontSize="11.5vh" lineHeight="17vh" />
                    </div>
                    <ComputerScreen />
                </div>
            );
        }

        if (this.state.curPage.startsWith("difficulty") || this.state.curPage === "saved") {
            return (
                <div style={contentStyle}>
                    <div style={ titleAlignment }>
                        <Title type="small" textAlign="left" fontSize="11.5vh" lineHeight="17vh" />
                    </div>
                    <Problemset userHandle={ this.state.userHandle } curPage={ this.state.curPage } problemsetDifficulty={ this.state.curDifficulty }/>
                </div>
            );
        }

        // return (
        //         <MediaQuery minWidth={500}>
        //             <div style={contentStyle}>
        //                 <div style={ { flexFlow: "column nowrap", justifyContent: "space-between", alignItems: "center" } }>
        //                     <Title fontSize="11.5vh" lineHeight="15vh"/>
        //                     <Emoji fontSize="30vh" />
        //                 </div>
        //                 <StatWindow />
        //             </div>
        //         </MediaQuery>
        // );
    }
}

export default Content;