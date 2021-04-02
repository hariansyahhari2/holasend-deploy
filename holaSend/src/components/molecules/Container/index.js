import React, {useEffect, useState} from "react";
import {
    Collapse, DropdownItem, DropdownMenu, DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand, NavbarText,
    NavbarToggler,
    NavItem,
    NavLink, UncontrolledDropdown
} from "reactstrap";
import swal from "sweetalert";
import {Modal} from "react-bootstrap";

const Container = (props) => {

    const [errorState, setErrorState] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (props.error) {
            setErrorState(props.error)
            setIsOpen(true)
        }
        console.log("LOADING")
        setIsLoading(props.loading)
    }, [props.error, props.loading])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            {
                errorState ? swal("Error", `${errorState.message}`).then(setErrorState(null)) : null
            }
            {props.children}
        </div>
    )
}

export default Container