

export async function getList(Model,query,selector) {
  return await Model.find(query).select(selector);
}
export async function getById(Model,id) {
  return await Model.findById(id);
}
export async function save(Model, data) {
 //  console.log(data);
  const d = new Model(data);
  // console.log(d);
  return await d.save();
}

export async function remove(Model, id) {
  return await Model.findByIdAndRemove(id);
}
