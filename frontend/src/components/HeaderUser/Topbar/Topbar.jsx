import React from 'react'
import { styled } from '@mui/system'
import { Box } from '@mui/material'

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#03235e',
  color: 'white',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1302,
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    fontSize: '0.8rem'
  }
}))

const MarqueeText = styled('div')({
  display: 'inline-block',
  paddingLeft: '100%',
  animation: 'marquee 15s linear infinite',
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-100%)' }
  }
})

function Topbar() {
  return (
    <div>
      {/* TopBar */}
      <TopBar>
        <MarqueeText>
          ⚡ Ưu đãi cực sốc lên tới 70% toàn bộ sản phẩm - Chỉ trong tuần lễ
          vàng này! ⚡ Mua ngay hôm nay để nhận quà hấp dẫn!
        </MarqueeText>
      </TopBar>
    </div>
  )
}

export default Topbar
