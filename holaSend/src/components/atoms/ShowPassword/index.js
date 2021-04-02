import React, { useState } from 'react'

const ShowPassword = () => {

    const [visibility, setVisibility] = useState(false)

    const Icon = <i className={visibility ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => setVisibility(visibility => !visibility)} />

    const InputType = visibility ? "text" : "password"

    return [InputType, Icon]
}

export default ShowPassword
