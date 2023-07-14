import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Alert, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
    });

    const defaultValues = {
        email: "mtna@gmail.com"
    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = methods;

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        try {
            dispatch(ForgotPassword(data));
        } catch (error) {
            console.error(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField name="email" label="Email address" />

            </Stack>

            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Send Request
            </Button>
        </FormProvider>
    );
}

export default ResetPasswordForm