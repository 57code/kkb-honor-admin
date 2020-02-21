export const map = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']

// 倔强青铜（1~9）：需要9颗星星（分为三小段，每段三星晋级）
// 秩序白银（10~21）：需要12颗星星（分为三小段，每段四颗星晋级）
// 荣耀黄金（22~37）：需要16颗星星（分为四小段，每段四颗星晋级）
// 尊贵铂金（38~62）：需要25颗星星（分为五小段，每段五颗星晋级）
// 永恒钻石（63~87）：需要25颗星星（分为五小段，每段五颗星晋级）
// 至尊星耀（88~112）：需要25颗星星（分为五小段，每段五颗星晋级）
// 最强王者（113~162）：需要50颗星星（没有小段）
// 荣耀王者（163~213）：需要51颗星星（没有小段）
export function parseRank(rank: number): string {
  let ret = ''
  let level = 0

  if (rank >= 1 && rank <= 9) {
    level = Math.floor((rank - 1) / 3) + 1
    ret = '倔强青铜' + map[level - 1]
  } else if (rank >= 10 && rank <= 21) {
    level = Math.floor((rank - 10) / 4) + 1
    ret = '秩序白银' + map[level - 1]
  } else if (rank >= 22 && rank <= 37) {
    level = Math.floor((rank - 22) / 4) + 1
    ret = '荣耀黄金' + map[level - 1]
  } else if (rank >= 38 && rank <= 62) {
    level = Math.floor((rank - 38) / 5) + 1
    ret = '尊贵铂金' + map[level - 1]
  } else if (rank >= 63 && rank <= 87) {
    level = Math.floor((rank - 63) / 5) + 1
    ret = '永恒钻石' + map[level - 1]
  } else if (rank >= 88 && rank <= 112) {
    level = Math.floor((rank - 88) / 5) + 1
    ret = '至尊星耀' + map[level - 1]
  } else if (rank >= 113 && rank <= 162) {
    ret = '最强王者×' + (rank - 113)
  } else if (rank >= 163 && rank <= 213) {
    ret = '荣耀王者×' + (rank - 113)
  } else {
    ret = ''
  }
  return ret
}
