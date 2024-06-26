import React from 'react'
import axios from 'axios'

const problemsetStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginLeft: "5vh",
    fontFamily: "Work Sans, sans-serif",
};

const titleStyle = {
    display: "flex",
    flex: "0 0 auto",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "3vh",
    height: "3vh",
    margin: "0 0 1.5vh",
    fontWeight: "800",
};

const contentAlignment = {
    display: "flex",
    flex: "0 0 auto",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    overflowY: "scroll",
    height: "72vh",
};

const tableStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    justifyContent: "flex-start",
    border: "0.5vh solid #251b37",
    cursor: "pointer",
};

const headingRowStyle = {
    display: "flex", 
    flex: "1 1 auto", 
    flexFlow: "row nowrap", 
    justifyContent: "flex-start", 
    alignItems: "stretch", 
    fontWeight: "800", 
    textAlign: "center", 
    fontSize: "2.5vh",
    padding: "1vh 0",
    borderBottom: "0.3vh solid #251b37",
};

const headingIdStyle = {
    display: "flex", 
    flex: "0 0 auto", 
    flexFlow: "column nowrap", 
    alignItems: "stretch",
    width: "10vh",
    textAlign: "left",
    marginLeft: "2vh",
};

const headingNameStyle = {
    display: "flex", 
    flex: "1 1 auto", 
    flexFlow: "column nowrap", 
    alignItems: "stretch",
    marginLeft: "5vh",
    textAlign: "left",
};

const headingDifficultyStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    marginRight: "5vh",
    textAlign: "right",
};

const dataRowStyle = {
    display: "flex", 
    flex: "0 0 auto", 
    flexFlow: "row nowrap", 
    justifyContent: "flex-start", 
    alignItems: "center", 
    textAlign: "center", 
    fontWeight: "400", 
    fontSize: "2vh",
    borderRight: "0.3vh solid #251b37",
    borderBottom: "0.3vh solid #251b37",
};

const dataLinkStyle = {
    display: "flex",
    flex: "1 1 auto",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: "1vh 0",
};

const dataIdStyle = {
    display: "flex", 
    flex: "0 0 auto", 
    justifyContent: "flex-start", 
    flexFlow: "column nowrap", 
    alignItems: "stretch", 
    width: "10vh",
    textAlign: "left",
    borderCollapse: "collapse",
    marginLeft: "2vh",
};

const dataNameStyle = {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "flex-start",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    textAlign: "left",
    marginLeft: "5vh",
};

const dataDifficultyStyle = {
    display: "flex",
    flex: "0 0 auto",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    marginRight: "4vh",
    textAlign: "right",
};

class Problemset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            problemsetDesc: [],
        };

        for (let i = 0; i < 100; ++i) {
            this.state.problemsetDesc.push({
                id: "###",
                // name: ['A Lonely Light', 'Alice and Bob', 'Too Easy for U', 'Traveling Salesperson'][rand(0, 3)],
                // solvedStatus: ['accepted', 'failed', 'unattempted'][rand(0, 2)]
                probName: 'LOADING...',
                solvedStatus: 'unattempted',
                saved: false,
                difficulty: 'XXXX',
            });
        }
    }

    async componentDidMount() {
        let problemsetDesc;
        if (this.props.curPage === "saved") {
            problemsetDesc = (await axios.get('/get-problemset/' + this.props.userHandle + '/saved')).data;
        }
        else {
            problemsetDesc = (await axios.get('/get-problemset/' + this.props.userHandle + '/' + this.props.problemsetDifficulty.toString())).data;
        }
        this.setState({
            // problemsetDesc: await getProblems(this.props.problemsetDifficulty, "kachhuaa")
            problemsetDesc: problemsetDesc
        });
    }

    getRowStyle(problemSolvedStatus, isLastRow, isPlaceholder) {
        const curRowStyle = structuredClone(dataRowStyle);
        if (problemSolvedStatus == 'accepted')
            curRowStyle.backgroundColor = '#b8ffb8';
        else if (problemSolvedStatus == 'failed')
            curRowStyle.backgroundColor = '#fdb4b4';
        else
            curRowStyle.backgroundColor = 'transparent';
        
        // if (isLastRow)
        //     curRowStyle.borderBottom = "0 none #251b37";
        
        if (isPlaceholder)
            curRowStyle.padding = "1vh 0.7vh 1vh 0";

        return curRowStyle;
    }

    handleClick(problemIndex) {
        const newProblemsetDesc = this.state.problemsetDesc;

        const reqParams = 
            this.props.userHandle + '/' 
            + newProblemsetDesc[problemIndex].id + '/' 
            + newProblemsetDesc[problemIndex].probName + '/'
            + this.props.problemsetDifficulty.toString();
        
        console.log(newProblemsetDesc[problemIndex]);
        
        if (newProblemsetDesc[problemIndex].saved) {
            newProblemsetDesc[problemIndex].saved = false;
            axios.get('/remove-problem-from-saved/' + reqParams);
        }
        else {
            newProblemsetDesc[problemIndex].saved = true;
            axios.get('/add-problem-to-saved/' + reqParams);
        }

        this.setState({
            problemsetDesc: newProblemsetDesc,
        });
    }

    getTableRows() {
        const filledStar = (
            <span style={ { color: "#7f0068" } } class="material-icons md-24">
                star
            </span>
        );

        const outlinedStar = (
            <span style={ { color: "#251b37", fontSize: "2.5vh" } } class="material-symbols-outlined">
                star
            </span>
        );

        return this.state.problemsetDesc.map((elem, idx, array) => {

            if (this.props.curPage === "saved" || !elem.saved)
                dataDifficultyStyle.color = "#251b37";
            else
                dataDifficultyStyle.color = "#7f0068";
            const curRowStyle = this.getRowStyle(elem.solvedStatus, idx === array.length - 1, elem.id === "###");
            
            const problemLink = "https://www.codeforces.com/problemset/problem/" + elem.id.substring(0, elem.id.length - 1) + "/" + elem.id[elem.id.length - 1];

            if (elem.id === "###") {
                return (
                    <tr className="tableRow" style={ curRowStyle }>
                        <td style={ dataIdStyle }>{ elem.id }</td>
                        <td style={ dataNameStyle }>{ elem.probName }</td>
                        <td style={ dataDifficultyStyle }>{ 
                            this.props.curPage === "saved" 
                            ? elem.difficulty.toString()
                            : (elem.saved ? filledStar : outlinedStar)
                        }</td>
                    </tr>
                );
            }

            return (
                <tr className="tableRow" style={ curRowStyle }>
                    <a style={ dataLinkStyle } href={ problemLink } target="_blank" rel="noopener noreferrer">
                        <td style={ dataIdStyle }>{ elem.id }</td>
                        <td style={ dataNameStyle }>{ elem.probName }</td>
                    </a>
                    <td style={ dataDifficultyStyle }>{ 
                        <button style={ { fontSize: "2vh", fontFamily: "Work Sans, sans-serif", borderWidth: "0", backgroundColor: "transparent", cursor: "pointer" } } onClick={ this.handleClick.bind(this, idx) }> { 
                            this.props.curPage === "saved" 
                            ? elem.difficulty.toString()
                            : (elem.saved ? filledStar : outlinedStar)
                        }</button>
                    }</td>
                </tr>
            );
        });
    }

    getSolvedCount() {
        return this.state.problemsetDesc.reduce((count, problem) => problem.solvedStatus === "accepted" ? ++count : count, 0);
    }

    getTitle() {
        const problemsetTitleFragments = [];

        if (this.props.curPage === "saved") {
            problemsetTitleFragments.push(
                (<span style={ { color: "#7f0068" } }>
                    Saved
                </span>),
                (<span style={ { color: "#251b37" } }>
                    &nbsp;Problems
                </span>)
            );
        }
        else {
            problemsetTitleFragments.push(
                (<span style={ { color: "#251b37" } }>
                    Difficulty&nbsp;
                </span>),
                (<span style={ { color: "#7f0068" } }>
                    { this.props.problemsetDifficulty }
                </span>)
            );
        }

        return (
            <div style={ titleStyle }>
                { problemsetTitleFragments }
                <span style={ { color: "#251b37" } }>
                    &nbsp;- Solved&nbsp;
                </span>
                <span style={ { color: "#7f0068" } }>
                    { this.getSolvedCount() }
                </span>
                <span style={ { color: "#251b37" } }>
                    &nbsp;of { this.state.problemsetDesc.length }
                </span>
            </div>
        )
    }

    render() {
        return (
            <div style={ problemsetStyle }>
                { this.getTitle() }
                <table style={ tableStyle }>
                    <tr style={ headingRowStyle }>
                        <th style={ headingIdStyle }>#</th>
                        <th style={ headingNameStyle }>Name</th>
                        <th style={ headingDifficultyStyle }>{ this.props.curPage === "saved" ? "Rating" : "" }</th>
                    </tr>
                    <div style={ contentAlignment }>{ this.getTableRows() }</div>
                </table>
            </div>
        );
    }
};

export default Problemset;