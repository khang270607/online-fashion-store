const StyleAdmin = {
  OverlayModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  InputCustom: {
    '& .MuiOutlinedInput-input': {
      color: '#000' // đây là phần text trong input
    },
    InputViews: {
      '& .MuiOutlinedInput-input': {
        color: '#808080' // đây là phần text trong input
      }
    },
    '& label': {
      color: '#000' // màu label
    },
    '& label.Mui-focused': {
      color: '#000' // màu label khi focus
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000' // màu viền mặc định
      },
      '&:hover fieldset': {
        borderColor: '#000' // màu viền khi hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000', // màu viền khi focus
        borderWidth: '1px' // độ dày viền khi focus
      }
    },
    CursorNone: {
      '& .MuiOutlinedInput-root:hover': {
        cursor: 'no-drop' // ẩn con trỏ khi hover toàn vùng
      },
      '& .MuiOutlinedInput-input:hover': {
        cursor: 'no-drop' // ẩn con trỏ trong vùng input
      }
    }
  },
  FormSelect: {
    color: '#808080',
    '& label': {
      color: '#000'
    },
    '& label.Mui-focused': {
      color: '#000'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000'
      },
      '&:hover fieldset': {
        borderColor: '#000'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
        borderWidth: '1px'
      }
    },
    SelectMenu: {
      '& .MuiMenu-list': {
        padding: '0 !important'
      },
      '& .MuiMenuItem-root': {
        fontSize: '14px',
        padding: '12px 16px',
        color: '#000',
        '&:hover': {
          backgroundColor: '#f0f0f0'
        }
      },
      '& .Mui-selected': {
        backgroundColor: '#ebebeb !important',
        '&:hover': {
          backgroundColor: '#ebebeb'
        }
      },
      '& .MuiDivider-root': {
        margin: '4px 0',
        backgroundColor: '#ccc'
      }
    }
  }
}
export default StyleAdmin
