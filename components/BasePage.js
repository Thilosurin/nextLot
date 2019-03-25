import { Container } from 'semantic-ui-react'

const BasePage = (props) => {
  const { title } = props;

  return (
    <div>
      <Container>
        {title && <div><h1>{title}</h1></div>}
        {props.children}
      </Container>
    </div>
  )
}

export default BasePage;
