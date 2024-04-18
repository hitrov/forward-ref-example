import {forwardRef, useEffect, useRef, useState} from "react";

const ControlledInput = forwardRef(({onChange, value, name}, ref) => (
  <input
    ref={ref}
    onChange={onChange}
    value={value}
    name={name}
    type="text"
  />
))

function App() {

  const childRef = useRef(null)
  const focusInput = () => childRef.current.focus()
  useEffect(focusInput, []);

  const [value, setValue] = useState('')
  const onInputChange = e => setValue(e.target.value)

  const [inputBeforeLabel, setInputBeforeLabel] = useState(false)

  // const Input = ({ref}) => (
  //   <ControlledInput
  //     ref={ref}
  //     value={value}
  //     onChange={onInputChange}
  //     name={'name'}
  //   />
  // )
  const Input = (
    <ControlledInput
      ref={childRef}
      value={value}
      onChange={onInputChange}
      name={'name'}
    />
  )

  let components
  let Before = () => null
  let After = () => null

  const Label = () => <label htmlFor="name">enter name</label>

  if (inputBeforeLabel) {
    components = [
      Label,
      // () => <ControlledInput ref={childRef} value={value} onChange={onInputChange} name={'name'} />,
      // Input,
      () => Input,
      // () => <Input ref={childRef} />,
      // <Input ref={childRef} />,
    ]

    After = Label
  } else {
    components = [
      // () => <ControlledInput ref={childRef} value={value} onChange={onInputChange} name={'name'} />,
      // Input,
      () => Input,
      // () => <Input ref={childRef} />,
      // <Input ref={childRef} />,
      Label,
    ]

    Before = Label
  }

  return (
    <div>
       {/* can type only first char */}
      {components.map((Component, index) => (
        <Component key={index} />
      ))}

      {/* this DOES work (if you'll remove components.map above) */}
      {/*<Before />*/}
      {/*<ControlledInput*/}
      {/*  ref={childRef}*/}
      {/*  value={value}*/}
      {/*  onChange={onInputChange}*/}
      {/*  name={'name'}*/}
      {/*/>*/}
      {/*<After />*/}

      <button onClick={focusInput}>Focus Input</button>
      <button onClick={() => setInputBeforeLabel(!inputBeforeLabel)}>
        {`Move label ${inputBeforeLabel ? 'after' : 'before'} input`}
      </button>
    </div>
  );
}

export default App;
