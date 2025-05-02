import { useParams } from 'react-router-dom'

function ExamplePage() {
  const { exampleId } = useParams()

  return (
    <>
      <h2>EXAMPLE PARAM: {exampleId}</h2>
    </>
  )
}

export default ExamplePage
