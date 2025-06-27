import * as _ from './style.ts'

type Props = {
    width: number
    height: number
}

const Element = (props: Props) => {
    return (
        <_.ElementWrapper width={props.width}
                          height={props.height}>

        </_.ElementWrapper>
    )
}

export default Element