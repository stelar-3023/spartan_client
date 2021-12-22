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
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export function SignupModal(props: any) {
  const [state, setState] = useState({});
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
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

  const history = useHistory();

  const { email, password, name } = inputs;

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes === 'User already registered') {
        history.push('/');
        toast.error(parseRes);
      } else {
        console.log(parseRes);
        localStorage.setItem('token', parseRes);
        history.push('/home');
        props.setAuth(true);
        toast.success('Register successful');
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
      toggleSignup();
    }
  };

  return (
    <Fragment>
      {props.renderSignup(toggleSignup)}
      <Modal
        id='modal-signup'
        className='modal'
        isOpen={isSignupOpen}
        centered={true}
        toggle={toggleSignup}
      >
        <ModalBody className='modal-content'>
          <h4>Sign up</h4>
          <br />
          <Form onSubmit={onSubmitForm} id='signup-form'>
            <FormGroup className='input-field'>
              <Label for='signup-email'>Email Address</Label>
              <Input
                value={email}
                onChange={(e) => handleChange(e)}
                type='email'
                name='email'
                data-testid='email-input'
                autoComplete='on'
                id='signup-email'
                placeholder='Enter email'
                required
              />
            </FormGroup>
            <FormGroup className='input-field'>
              <Label for='sign-up-password'>Choose Password</Label>
              <Input
                value={password}
                onChange={(e) => handleChange(e)}
                type='password'
                name='password'
                autoComplete='off'
                id='signup-password'
                placeholder='password'
                required
              />
            </FormGroup>
            <FormGroup className='input-field'>
              <Label for='signup-username'>Choose username</Label>
              <Input
                value={name}
                onChange={(e) => handleChange(e)}
                type='text'
                name='name'
                autoComplete='off'
                id='signup-username'
                placeholder='username'
                required
              />
              <br />
              <Button type='submit' /*onClick={}*/ color='danger' size='sm'>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
