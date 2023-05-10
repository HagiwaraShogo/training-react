import axios from "axios";
import { useState } from "react";
import { PlayerItem } from "../types/playerItem";

const PlayerItemStatus = () => {
  const dummy: PlayerItem[] = [{
    itemId: 1,
    name: "aaa",
    heal: 10,
    price: 10,
    count: 5
  }]
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [counts,setCount] = useState<number[]>([]);

  const fetchData = async () => {
    const playerId = localStorage.getItem("playerId");
    try{
      const res = await axios.get(`http://localhost:3000/playerItems/${playerId}/getPlayerItemAllData`);
      const data = await res.data;
      return data;
    } catch(e) {
      return null;
    }
  }

  const getAPI = async () => {
    const result = await fetchData();
    if (result == null) {
      setPlayerItems(dummy);
    } else {
      setPlayerItems(result);
    }
    setCount(new Array(playerItems.length).fill(1));
  }

  const updateAPI = async () => {
    const result = await fetchData();
    if (result == null) {
      setPlayerItems(dummy);
    } else {
      setPlayerItems(result);
    }
  }

  const use = async (itemId:number) => {
    const playerId = localStorage.getItem("playerId");
    const body = {
      "itemId": itemId,
      "count": counts[itemId - 1]
    }
    try{
      await axios.post(`http://localhost:3000/playerItems/${playerId}/useItem`,body);
      updateAPI();
    } catch(e) {
      return null;
    }
  }

  const countChange = (e:any,itemId:number) => {
    setCount(counts.map((value,index) => (index === itemId - 1 ? e.target.value : value)))
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>PlayerItemStatus</h2>
      <button onClick={getAPI}>APIアクセス</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>名前</th>
            <th>heal</th>
            <th>price</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 取得したデータ表示 */}
          {playerItems.map((d) => (
            <tr key={d.itemId}>
              <td>{d.itemId}</td>
              <td>{d.name}</td>
              <td>{d.heal}</td>
              <td>{d.price}</td>
              <td>{d.count}</td>
              <td><input type="number" value={counts[d.itemId - 1]} min={1} max={d.count}
                onChange={(e) => countChange(e,d.itemId)}
              /></td>
              <td><button onClick={() => use(d.itemId)}>使う</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerItemStatus;