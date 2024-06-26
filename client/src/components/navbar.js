import Logo from './logo'
import NavLink from './navLink'
import DropDown from './dropDown'
import React from 'react';

const navbarStyle = {
    backgroundColor: "#533e6d",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: "7vh",
    textAlign: "center",
    width: "100%",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
};

const navLinkAlignment = {
    display: "flex",
    flex: "1 1 auto",
};

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={navbarStyle}>
                <div style={ { marginLeft: "7.5vh"/*, marginRight: "50vh"*/, display: "flex", alignItems: "center" } }>
                    <Logo fontSize="5vh" />
                </div>
                <div style={ { display: "flex", marginRight: "7.5vh", flexFlow: "row nowrap", justifyContent: "flex-end", alignItems: "stretch", /*flex: "1 1 auto"*/ } }>
                    <div style={navLinkAlignment}>
                        <NavLink label="Saved Problems" href="/problemset/saved" />
                    </div>
                    {/* <div style={navLinkAlignment}>
                        <NavLink label="Last Unsolved" />
                    </div> */}
                    <div style={navLinkAlignment}>
                        <DropDown />
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;