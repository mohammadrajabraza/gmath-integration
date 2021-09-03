export const flexibleComparisonOptions = {
  unify_leading_negatives: true,
  sortCommutativeTerms: true,
  removeOptionalBracketsOneLevel: true
}

export const strictComparisonOptions = {
  unify_leading_negatives: true,
  sortCommutativeTerms: false,
  removeOptionalBracketsOneLevel: false
}

export const canvasSmallToolbarSettings = {
  auto_resize_on_scroll: false,
  add_more_space_btn: false,
  use_toolbar: true,
  undo_btn: true,
  redo_btn: true,
  new_sheet_btn: false,
  font_size_btns: true,
  formula_btn: true,
  help_btn: false,
  fullscreen_btn: true,
  transform_btn: false,
  keypad_btn: false,
  scrub_btn: false,
  draw_btn: false,
  erase_btn: false,
  arrange_btn: false,
  save_btn: false,
  load_btn: false,
  settings_btn: false,
  share_btn: false,
  insert_btn: false,
  use_hold_menu: false,
  display_labels: false,
  btn_size: 'xs',
  ask_confirmation_on_closing: false
}

const derivationDarkSettings = {
  pos: 'auto',
  font_size: 30,
  row_background_color: '#333',
  bg_edit_active_style: {
    'background-color': '#333',
    'box-shadow': 'none'
  },
  bg_edit_dragging_style: {
    'background-color': '#444',
    'box-shadow': '0 3px 6px rgba(0,0,0,0.5)'
  },
  bg_arrange_style: {
    'background-color': 'rgba(68,68,68,0.9)',
    'box-shadow': '0 3px 6px rgba(0,0,0,0.23)'
  },
  bg_arrange_active_style: {
    'background-color': 'rgba(68,68,68,0.9)',
    'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  bg_arrange_dragging_style: {
    'background-color': 'rgba(68,68,68,0.9)',
    'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  handle_styles: {
    background: '#333',
    'border-color': 'gray',
    'border-width': '1px'
  },
  color: 'whitesmoke',
  shadow_node_color: '#333', // used to fill shadow terms
  shadow_node_shadow: '0 0 1px white, 0 0 1px white', // used for css box-shadow or text-shadow
  selection_color: '#61A5DA', // color of selected nodes
  drag_indicator_color: '#D49C83',
  drag_indicator_opacity: 1
}

export const derivationSettings = {
  ...derivationDarkSettings,
  cloning_on: false
}
