import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { DropdownList, Gap, Input, Loading } from '../../../../components/atoms'
import { getRadiusAction, putRadiusAction } from "../../../../configs/actions/radius/radiusAction"

const Radius = (props) => {
    const [data, setdata] = useState("")

    useEffect(() => {
        onReload()
    }, [])

    useEffect(() => {
        if(props.data) {
            setdata(props.data)
        }
    }, [props.data]);

    const onReload = () => {
        console.log("run this")
        props.dispatchGetRadiusAction()
    };

    const onSubmit = () => {
        props.dispatchPutRadiusAction(data)
    }


    const onChange = (e) => {
        var value = e.target.value
        setdata(value)
    }

    useEffect(() => {

        if(props.success) {
            swal("Success!", `Radius has been updated!`, "success");
        } else if(props.success != null) {
            swal("Error!", `Something wrong, try again!`, "error");
        }
    })


    return (
        <div className="content-wrapper">
        <div className="content-header">
            
            <Container
                className="container"
                loading={props.isLoading}
                style={{ marginTop: "50px" }}
            >
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Configuration</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <div className="card card-primary">
                            <div className="card-header" style={{backgroundColor: "#536DFE", padding: "1rem 3rem",}}>
                                <Gap height={10} />
                                <h3 className="card-title">Radius</h3>
                            </div>
                            <div className="card-body" style={{ padding: "1rem 3rem" }}>
                                <Gap height={10} />
                                <Input label="Offset Value (m)" value={data} onChange={onChange} placeholder="Radius Value" />
                            </div>
                            <div className="card-footer" style={{ padding: "1rem 3rem" }}>
                                <div className="row">
                                    <div className="col">
                                        <Button style={{width: "100%", backgroundColor: '#536DFE', padding: "12px", borderRadius: "12px",  textTransform: "uppercase"}} onClick={() => onSubmit()} >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
    )
}


// reducer
const mapStateToProps = (state) => {
    return {
        data: state.getRadiusReducer.data,
        putRadius: state.putRadiusReducer.data,
        isLoading: state.getRadiusReducer.isLoading || state.putRadiusReducer.isLoading,
        error: state.getRadiusReducer.error || state.putRadiusReducer.error,
        success: state.putRadiusReducer.data
    }
}

// action
const mapDispatchToProps = {
    dispatchGetRadiusAction : getRadiusAction,
    dispatchPutRadiusAction : putRadiusAction
}

export default connect(mapStateToProps, mapDispatchToProps) (Radius);