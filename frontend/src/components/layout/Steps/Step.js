import React,{Fragment}from 'react'
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const Steps = ({activeStep}) => {
    const steps=[
{
    label:<Typography>Shipping Details</Typography>,
    icon:<LocalShippingIcon/>
},
{
    label:<Typography>Confirm Order</Typography>,
    icon:<LibraryAddCheckIcon/>
},
{
    label:<Typography>Payment</Typography>,
    icon:<AccountBalanceIcon/>
},
    ]
  return (
    <Fragment>
        
<Stepper activeStep={activeStep} style={{'box-sizing':'border-box'}}>
    {steps.map((i,index)=>{
        return(
            <Step key={activeStep} active={activeStep===index ? true : false} completed={activeStep>=index ? true : false}>
                <StepLabel style={{color:activeStep>=index ? 'orange' : 'gray'}} icon={i.icon}>{i.label}</StepLabel>
            </Step>
        )
    })}
</Stepper>

    </Fragment>
  )
}

export default Steps