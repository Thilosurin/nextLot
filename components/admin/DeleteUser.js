import { Button, Header, Modal, Icon } from 'semantic-ui-react'

import { signoutUser } from "../../lib/auth";
import { deleteUser } from "../../lib/api";

class DeleteUser extends React.Component {
  state = {
    open: false,
    isDeleting: false
  };

  handleDeleteUser = () => {
    const { user } = this.props;

    this.setState({ isDeleting: true });

    deleteUser(user._id)
      .then(() => {
        signoutUser();
      }).catch(err => {
        console.error(err);
        this.setState({ isDeleting: false });
      });
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { open, isDeleting } = this.state;
    
    return (
      <div>
        <Button color="red" basic onClick={this.handleOpen}>
          <Icon name='trash alternate' />Delete user
        </Button>

        <Modal
          size='mini'
          dimmer="blurring"
          open={open}
        >
          <Header icon='trash' content='Delete Account!' color="red"/>
          <Modal.Content>
            <h3>Confirm to delete this account</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleDeleteUser} color="red" disabled={isDeleting}>
              {isDeleting ? "Deleting" : "Confirm"}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeleteUser;
