import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function AppWrapper({ children }) {
    return (
        <Fragment>
            <Header />
            <div>{children}</div>
            <Footer />
        </Fragment>
    )
}