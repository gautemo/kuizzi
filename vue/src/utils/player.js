import { reactive } from 'vue'
import { dbGame, getUid } from '@/utils/db'
import { goToGame as gameGoToGame } from '@/utils/game'

const me = reactive({
  name: '',
  icon: '',
  color: '',
  uid: '',
})

const addMe = async (name, icon, color) => {
  me.name = name;
  me.icon = icon;
  me.color = color;
  me.uid = await dbGame.addPlayer(me);
}

const goToGame = id => {
  gameGoToGame(id, async data => {
    if (!me.name) {
      const uid = await getUid();
      const meInDb = data.players.find(p => p.uid === uid);
      if (meInDb) {
        me.name = meInDb.name;
        me.icon = meInDb.icon;
        me.color = meInDb.color;
        me.uid = meInDb.uid;
        me.score = meInDb.score;
      }
    }
  })
}

export { goToGame, me, addMe };