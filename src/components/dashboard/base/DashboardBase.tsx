import * as _ from './style.ts'

type Props = {
    width: number
    height: number
    column: number
    row: number
    background?: string
    radius?: number
}

const DashboardBase = (props: Props) => {


    return (
        <_.DashboardBase $width={props.width} $height={props.height} $background={props.background}
                         $radius={props.radius}>

        </_.DashboardBase>
    )
}

export default DashboardBase;