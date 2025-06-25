import * as _ from './style.ts'
import Plus from '../../../assets/dashboard/node/plus-circle.svg'

type Props = {
    width: number
    height: number
    radius?: number
    primary?: string
}

const DashboardNode = (props: Props) => {
    return (
        <_.DashboardNode $width={props.width}
                         $height={props.height}
                         $radius={props.radius}
                         $primary={props.primary}>
            <_.Plus src={Plus}/>
        </_.DashboardNode>
    )
}

export default DashboardNode