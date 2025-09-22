import { useDrugsStore } from "../../store/useDrugsStore"


function ViewMore() {
  const {drugToViewMore} = useDrugsStore()

  console.log(drugToViewMore);
  

  return (
    <div>
      
      
      ViewMore</div>
  )
}

export default ViewMore