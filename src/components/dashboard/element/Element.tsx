import * as _ from './style.ts'

type Props = {
    width: number
    height: number
    top: number
    left: number
    radius: number
}

const Element = (props: Props) => {
    return (
        <_.ElementWrapper top={props.top}
                          left={props.left}
                          width={props.width}
                          height={props.height}
                          radius={props.radius}>

        </_.ElementWrapper>
    )
}

export default Element