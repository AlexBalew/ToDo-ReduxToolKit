import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material"
import {useFormik} from 'formik'
import {useDispatch, useSelector} from "react-redux";
import {authTC} from "../../Reducers/authReducer";
import {MainReducerType} from "../../store/store";
import {Redirect} from "react-router-dom";

export const Login = () => {

    const dispatch = useDispatch()
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
        onSubmit: values => {
           dispatch(authTC(values))
        }
    })


    if(isLoggedIn) {
        return <Redirect to={'/'} />
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