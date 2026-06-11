import {
    Stepper as MuiStepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    type StepIconProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check, X } from "lucide-react";
import "./stepper.scss";

export interface StepItem {
    label: string;
    description?: string;
}

interface StepperProps {
    steps: StepItem[];
    activeStep: number;
    error?: boolean;
    orientation?: "horizontal" | "vertical";
    customClass?: string;
    latestStepIndex?: number;
}

const CustomConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 13,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#2a67ff",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#2a67ff",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 2,
        border: 0,
        backgroundColor: "#e4e9ee",
        borderRadius: 2,
    },
    // vertical connector
    [`&.${stepConnectorClasses.vertical}`]: {
        marginLeft: 13,
        padding: "4px 0",
        [`& .${stepConnectorClasses.line}`]: {
            width: 2,
            minHeight: 24,
            height: "100%",
        },
    },
}));

interface CustomStepIconProps extends StepIconProps {
    isLatest?: boolean;
}

function CustomStepIcon({
    active,
    completed,
    error,
    icon,
    isLatest,
}: CustomStepIconProps) {
    if (error) {
        return (
            <div className="custom-step-icon step-error">
                <X size={13} />
            </div>
        );
    }
    if (isLatest) {
        return (
            <div className="custom-step-icon step-completed">
                <Check size={13} />
            </div>
        );
    }
    if (completed) {
        return (
            <div className="custom-step-icon step-past">
                {icon}
            </div>
        );
    }
    return (
        <div
            className={`custom-step-icon ${active ? "step-active" : "step-pending"}`}
        >
            {icon}
        </div>
    );
}

function Stepper({
    steps,
    activeStep,
    error = false,
    orientation = "horizontal",
    customClass,
    latestStepIndex,
}: StepperProps) {
    const resolvedLatest = latestStepIndex ?? activeStep - 1;

    return (
        <MuiStepper
            activeStep={activeStep}
            orientation={orientation}
            connector={<CustomConnector />}
            alternativeLabel={orientation === "horizontal"}
            className={customClass}
            sx={{ padding: 0, background: "transparent" }}
        >
            {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                const isError = error && index === resolvedLatest;
                const isLatest = !isError && index === resolvedLatest;

                const labelClass = isError
                    ? "error"
                    : isLatest
                      ? "active"
                      : isCompleted
                        ? "completed"
                        : isActive
                          ? "active"
                          : "pending";

                return (
                    <Step key={step.label} completed={isCompleted}>
                        <StepLabel
                            error={isError}
                            icon={
                                <CustomStepIcon
                                    completed={isCompleted}
                                    active={isActive}
                                    error={isError}
                                    isLatest={isLatest}
                                    icon={isCompleted && !isLatest ? index : index + 1}
                                />
                            }
                            optional={
                                step.description ? (
                                    <span className="stepper-step-description">
                                        {step.description}
                                    </span>
                                ) : undefined
                            }
                            slotProps={{
                                label: {
                                    className: `stepper-step-label ${labelClass}`,
                                },
                            }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                );
            })}
        </MuiStepper>
    );
}

export default Stepper;
