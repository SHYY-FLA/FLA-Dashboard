import * as _ from './style.ts'

type Props = {
    x: number
    y: number
    editModeStatus: boolean
    editModeHandler: (e: React.MouseEvent) => void
}

const DetailOption = (props: Props) => {
    return (
        <_.OptionsContainer x={props.x} y={props.y} onClick={props.editModeHandler}>
            <_.Option><_.OptionTitle>{props.editModeStatus?'수정 완료':'수정 하기'}</_.OptionTitle></_.Option>
        </_.OptionsContainer>
    )
}

export default DetailOption