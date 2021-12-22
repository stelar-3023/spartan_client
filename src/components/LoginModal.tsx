import { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
} from 'reactstrap';
import { toast } from 'react-toastify';

export function LoginModal(props: any) {
  const [state, setState] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  // clean the state in the unmount of the component
  useEffect(() => {
    resetInputs();
    return () => {
      setState({});
    };
  }, []);

  const resetInputs = () => {
    setState({ setInputs });
  };
  console.log(state);

  const { email, password } = inputs;

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      // console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        props.setAuth(true);
        toast.success('Login successful');
      } else {
        props.setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      let errorMessage = 'Server error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
    }
    // eslint-disable-next-line no-lone-blocks
    {
      toggleLogin();
    }
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <Fragment>
      {props.renderLogin(toggleLogin)}
      <Modal
        id='modal-login'
        className='modal'
        isOpen={isLoginOpen}
        centered={true}
        toggle={toggleLogin}
      >
        <ModalBody className='modal-content'>
          <h4>Login</h4>
          <br />
          <Form onSubmit={onSubmitForm} id='login-form'>
            <FormGroup className='input-field'>
              <Label for='login-email'>Email Address</Label>
              <Input
                value={email}
                onChange={(e) => handleChange(e)}
                type='email'
                name='email'
                data-testid='email-input'
                autoComplete='off'
                id='login-email'
                placeholder='email'
                required
              />
            </FormGroup>
            <FormGroup className='input-field'>
              <Label for='login-password'>Your Password</Label>
              <Input
                value={password}
                onChange={(e) => handleChange(e)}
                type='password'
                name='password'
                autoComplete='off'
                id='login-password'
                placeholder='password'
                required
              />
              <br />
              <Button type='submit' /*onClick={}*/ color='danger' size='sm'>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
