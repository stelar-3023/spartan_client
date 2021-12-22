import { Fragment, useState, useEffect, useCallback } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise } from '../redux/exerciseSlice';
import { accountDetails } from '../redux/userSlice';
import { getExercises } from '../redux/exerciseSlice';
// import { v4 as uuidv4 } from "uuid";

export function WorkoutModal(props: any) {
  const dispatch = useDispatch();
  const exercises = useSelector((state: any) => state.exercises);
  const user = useSelector((state: any) => state.user);
  const [isLogWorkoutOpen, setIsLogWorkoutOpen] = useState(false);
  const [inputs, setInputs] = useState({
    exercise: '',
    reps: 0,
    weight: 0,
    date: new Date(),
    email: user.user.user_email,
  });

  const toggleWorkout = () => {
    setIsLogWorkoutOpen(!isLogWorkoutOpen);
  };

  const cancelModal = () => {
    setIsLogWorkoutOpen(false);
  };

  const initFetch = useCallback(() => {
    dispatch(accountDetails());
    dispatch(getExercises(user.user.user_email));
  }, [dispatch, user.user.user_email]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // const { exercise, reps, weight, date } = inputs;

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  console.log(exercises);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addExercise(inputs));
    console.log(inputs);
    setInputs({
      exercise: '',
      reps: 0,
      weight: 0,
      date: new Date(),
      email: user.user.user_email,
    });
    setIsLogWorkoutOpen(false);
  };

  return (
    <Fragment>
      {props.renderWorkout(toggleWorkout)}
      <Modal
        id='modal-exercise'
        className='modal'
        centered={true}
        isOpen={isLogWorkoutOpen}
        toggle={toggleWorkout}
      >
        <ModalBody>
          <Button
            className='cancel-log'
            onClick={cancelModal}
            size='sm'
            color='danger'
          >
            &times;
          </Button>
          <h2>Add Exercises</h2>
          <br />
          <Form onSubmit={handleSubmit} id='exercise-form'>
            <FormGroup className='input-field'>
              <Label for='exercise'>Exercise</Label>
              <Input
                value={inputs.exercise}
                onChange={(e) => handleChange(e)}
                type='text'
                name='exercise'
                autoComplete='off'
                id='exercise'
                placeholder='exercise'
                required
              />
            </FormGroup>
            <FormGroup className='input-field'>
              <Label for='repetitions'>Reps</Label>
              <Input
                value={inputs.reps}
                onChange={(e) => handleChange(e)}
                type='number'
                name='reps'
                autoComplete='off'
                id='reps'
                placeholder='reps'
                required
              />
            </FormGroup>
            <FormGroup className='input-field'>
              <Label for='repetitions'>Weight</Label>
              <Input
                value={inputs.weight}
                onChange={(e) => handleChange(e)}
                type='number'
                name='weight'
                autoComplete='off'
                id='weight'
                placeholder='weight'
                required
              />
            </FormGroup>
            <br />
            <Button type='submit' color='danger' size='sm'>
              Add Exercise
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
