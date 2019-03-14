import { Container } from 'semantic-ui-react'

const BasePage = (props) => {
  const { title, containerClass } = props;

  // const className = props.className || '';

  return (
    <div>
      <Container>
        { title && <div><h1>{title}</h1></div>}
        {props.children}
      </Container>
    </div>
  )
}

BasePage.defaultProps = {
  containerClass: ''
}

export default BasePage;
