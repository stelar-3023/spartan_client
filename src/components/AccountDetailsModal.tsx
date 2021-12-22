import { Fragment, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';

export function AccountModal(props: any) {
  const user = useSelector((state: any) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccount = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      {props.renderAccount(toggleAccount)}
      <Modal
        id='modal-account'
        className='modal'
        centered={true}
        isOpen={isOpen}
        toggle={toggleAccount}
      >
        <ModalBody className='modal-content'>
          <h2>Account Details</h2>
          <br />
          <div className='account-details'>
            <h4 data-testid='email'>Email: {user.user.user_email}</h4>
            <h4 data-testid='name'>Name: {user.user.user_name}</h4>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
