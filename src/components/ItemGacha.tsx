
import axios from "axios";
import { useState } from "react";
import { ItemGach} from "../types/itemGacha";

const ItemGacha = () => {
  const dummy: ItemGach[] = [{
    itemId:0,
    name:"null",
    count:0,
    totalCount:0
  }]
  const [itemGach, setItemGach] = useState<ItemGach[]>([]);
  const [counts,setCount] = useState(1);

  const gacha = async () => {
    const playerId = localStorage.getItem("playerId");
    const body = {
        "count": counts
    }

    try{
        const res = await axios.post(`http://localhost:3000/playerItems/${playerId}/useGacha`,body);
        const result = await res.data;
        setItemGach(result);
    } catch(e) {
        setItemGach(dummy);
    }
  }

  const countChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value))
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>ItemGacha</h2>
      <p><td><input type="number" value={counts} min={1} max={10}
       onChange={(event) => countChange(event)}
       /></td></p>
      <td><button onClick={gacha}>{counts}回ガチャ</button></td>
      <table>
        <thead>
          <tr>
            <th >Id</th>
            <th>名前</th>
            <th>結果</th>
            <th>所持数</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {/* TODO 取得したデータ表示 */}
          {itemGach.map((d) => (
            <tr key={d.itemId}>
              <td>{d.itemId}</td>
              <td>{d.name}</td>
              <td>{d.count}</td>
              <td>{d.totalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ItemGacha;