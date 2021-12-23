import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material"
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from "react-redux";
import {authTC} from "../../Reducers/authReducer";
import {useAppDispatch} from "../../store/store";
import {Navigate} from "react-router-dom";
import {MainReducerType} from "../../store/mainReducer";

type FormValuesTypes = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<MainReducerType, boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'insert correct email'
                }
            }
            if (!values.password) {
                return {
                    email: 'password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesTypes>) => {
           const action = await dispatch(authTC(values))
            if (authTC.rejected.match(action)) {
                if(action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                } else {

                }

            }

            //if (res === 'bad') { } // show error
        }
    })


    if(isLoggedIn) {
        return <Navigate to={'/'} />
    }


    return  <Grid container justifyContent='center'>
        <Grid item m={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in, please, get registration <a href={'https://social-network.samuraijs.com/'}
                                                                   target={'_blank'}
                                                                   rel={"noreferrer"}>here</a>
                        </p>
                        <p>
                            or use these test account credentials:
                        </p>
                        <p>
                            Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label='email'
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            label='password'
                            margin="normal"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            control={<Checkbox {...formik.getFieldProps('rememberMe')} color={'secondary'}/>}
                            label={'Remember me'}
                            checked={formik.values.rememberMe}
                        />
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>

}