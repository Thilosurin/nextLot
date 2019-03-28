import { Button, Icon } from 'semantic-ui-react'

class StatusUser extends React.Component {
  handleStatusChange = () => {

    
  };

  render() {
    const { player } = this.props;
    const checkAmdin = player.status === 1 ? 'Admin' : 'Player';
    
    return (
      <div>
        <Button color={checkAmdin === 'Admin' ? 'green' : 'grey'} basic onClick={this.handleStatusChange}>
          <Icon name='user' />{checkAmdin}
        </Button>
      </div>
    )
  }
}

export default StatusUser;
