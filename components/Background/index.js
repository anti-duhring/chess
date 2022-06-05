import { View, Text } from "react-native";

const WHITE = "#F0D9B5";
const BLACK = "#B58863"

const Square = ({row, column}) => {
    const offset = row % 2 == 0? 1: 0;
    const backgroundColor = (column + offset) % 2 == 0 ? BLACK : WHITE;
    const color = (column + offset) % 2 == 0 ? WHITE : BLACK;

    return (
        <View style={{flex:1,backgroundColor: backgroundColor, padding: 4, justifyContent:"space-between"}}>
            <Text style={{color:color, fontWeight:'500', alignSelf:'flex-end', opacity: column == 7 ? 1 : 0}}>{8 - row}</Text>
            <Text style={{color:color, opacity: row == 7 ? 1 : 0}}>{String.fromCharCode("a".charCodeAt(0) + column)}</Text>
        </View>
    )
}

const Row = ({row}) => {
    return (
        <View style={{flex:1, flexDirection:'row'}}>
            {
                new Array(8).fill(0).map((_, column) => (
                    <Square key={column} row={row} column={column} />
                ))
            }
        </View>
    )
}

const Background = () => {
    return ( 
        <View style={{flex:1}}>
            {
                new Array(8).fill(0).map((_, row) => (
                    <Row key={row} row={row} />
                ))
            }
        </View> 
    );
}
 
export default Background;