
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
  let menoy: number;

  const gacha = async (count:number) => {
    const playerId = localStorage.getItem("playerId");
    const body = {
        "count": count
    }

    try{
        const res = await axios.post(`http://localhost:3000/playerItems/${playerId}/useGacha`,body);
        const result = await res.data;
        setItemGach(result);
    } catch(e) {
        setItemGach(dummy);
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>ItemGacha</h2>
      <td><button onClick={() => gacha(1)}>1回</button></td>
      <td><button onClick={() => gacha(10)}>10回</button></td>
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