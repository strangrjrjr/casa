require "rails_helper"

RSpec.describe CasaOrg, type: :model do
  it { is_expected.to validate_presence_of(:name) }

  it "has unique name" do
    org = create(:casa_org)
    new_org = build(:casa_org, name: org.name)
    expect(new_org.valid?).to be false
  end

  describe "#logo_url" do
    it "returns casa_org_logo url field" do
      logo = create(:casa_org_logo, url: "foo.com")
      org = logo.casa_org
      expect(org.logo_url).to eq "foo.com"
    end
  end
end
