import React, { Component } from 'react'
import { render, Document, Text } from 'redocx'

class PDF extends Component {
  render() {
    return (
      <Document>
        <Text>Hello World</Text>
      </Document>
    )
  }
}
export default PDF;